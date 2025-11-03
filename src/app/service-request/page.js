"use client";
import { useState } from 'react';
import styles from './page.module.css';
import { supabase } from '../../lib/supabase/client.js'; // This allows us to communicate with the Supabase database.

export default function ServiceRequest() {
  // This state object holds the values of all form inputs. Initial values are empty
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    deviceSelect: '',
    deviceText: '',
    started: '',
    idea: '',
    questions: '',
  });

  // status tracks the submission lifecycle: null | 'sending' | 'submitted' | 'error'
  const [status, setStatus] = useState(null);

  // A generic onChange handler to update the form state for any input.
  function update(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  // Replace the handleSubmit function's logic.
  // This new async function sends the form data to Supabase table.
  async function handleSubmit(e) {
    // Prevent the default browser behavior of refreshing the page on form submission.
    e.preventDefault();
    // Set status to 'sending' to provide user feedback.
    setStatus('sending');

    // Check if at least one of the device fields is filled
    if (!form.deviceSelect && !form.deviceText) {
      setStatus("error");
      alert("Please select a device or type your device in the 'Or specify' field.");
      return; // Stop the submission
    }

    try {
      // Prepare the data for insertion.
      // The keys on the left (e.g., 'customer_name') MUST match the column names in your Supabase 'service_requests' table.
      // The values on the right (e.g., form.name) are from the user's input.
      const submissionData = {
        customer_name: form.name,
        phone_number: form.phone,
        email: form.email,
        // If a device is selected from the dropdown, use it. Otherwise, use the text input.
        device_type: form.deviceSelect || form.deviceText,
        problem_start_date: form.started,
        problem_cause_idea: form.idea,
        additional_questions: form.questions,
      };

      // Send the data to the 'service_requests' table in Supabase.
      const { data, error } = await supabase.from('service_requests').insert([submissionData]);

      // If Supabase returns an error, throw it to be caught by the 'catch' block.
      if (error) {
        throw error;
      }

      // If the submission is successful:
      // Set status to 'submitted' for user feedback.
      setStatus('submitted');
      // Reset the form fields to be empty for the next submission.
      setForm({ name: '', phone: '', email: '', deviceSelect: '', deviceText: '', started: '', idea: '', questions: '' });

    } catch (err) {
      // If any error occurs during the 'try' block:
      // Set status to 'error' for user feedback.
      setStatus('error');
      // Log the detailed error message to the browser's console for debugging.
      console.error('Error submitting to Supabase:', err);
    }
  }

  // The JSX for the form remains mostly the same.
  // only added a 'disabled' attribute to the button to prevent multiple submissions.
  return (
    <div className={styles.pageWrap}>
      <h1 className={styles.title}>Service Request Form</h1>

      <form onSubmit={handleSubmit} className={styles.formBox}>
        {/* Contact information group */}
        <div className={styles.sectionHeader}>1. Contact Information</div>

        <div className={styles.grid3}>
          <label className={styles.field}>
            <span className={styles.label}>Name</span>
            <input name="name" value={form.name} onChange={update} className={styles.input} required />
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Phone number</span>
            <input name="phone" value={form.phone} onChange={update} className={styles.input} type="tel" required/>
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Email address</span>
            <input name="email" value={form.email} onChange={update} className={styles.input} type="email" required />
          </label>
        </div>

        {/* Device information group */}
        <div className={styles.sectionHeader}>Device Information</div>
        <div className={styles.grid2}>
          <label className={styles.field}>
            <span className={styles.label}>Device</span>
            <select name="deviceSelect" value={form.deviceSelect} onChange={update} className={styles.input} disabled={!!form.deviceText}>
              <option value="">Select a device here</option>
              <option>Desktop</option>
              <option>Laptop</option>
              <option>Tablet</option>
              <option>Phone</option>
            </select>
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Or specify</span>
            <input name="deviceText" placeholder="Type your device here" value={form.deviceText} onChange={update} className={styles.input} disabled={!!form.deviceSelect}/>
          </label>
        </div>

        {/* Problem description group */}
        <div className={styles.sectionHeader}>2. Problem Description</div>
        <div className={styles.grid2}>
          <label className={styles.field}>
            <span className={styles.label}>When did the problem start?</span>
            <input name="started" value={form.started} onChange={update} className={styles.input} type="date"/>
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Do you have any idea when the problem occurred?</span>
            <input name="idea" value={form.idea} onChange={update} className={styles.input} />
          </label>
        </div>

        {/* Additional questions freeform */}
        <label className={styles.field}>
          <span className={styles.label}>Any other questions you have?</span>
          <textarea name="questions" value={form.questions} onChange={update} className={styles.textarea} />
        </label>

        {/* Submit button area */}
        <div className={styles.actions}>
          {/*Improve user experience on the submit button. */}
          <button type="submit" className={styles.submitBtn} disabled={status === 'sending'}>
            {status === 'sending' ? 'Submitting...' : 'Submit'}
          </button>
        </div>

        {/* Status messages shown based on the `status` state */}
        {status === 'submitted' && <p className={styles.success}>Submitted — admin will be notified.</p>}
        {status === 'error' && <p className={styles.error}>Error sending form.</p>}
      </form>
    </div>
  );
}