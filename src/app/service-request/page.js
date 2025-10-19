"use client";
import { useState } from 'react';
import styles from './page.module.css';

export default function ServiceRequest() {
  //Initial values are empty.
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

  // update: generic onChange handler for inputs. It expects the input's
  function update(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  // handleSubmit: send the form JSON to the API. Prevents the default form
  // submission behavior.
  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    try {
      await new Promise((res) => setTimeout(res, 400));
      setStatus('submitted');
      setForm({ name: '', phone: '', email: '', deviceSelect: '', deviceText: '', started: '', idea: '', questions: '' });
    } catch (err) {
      setStatus('error');
      console.error(err);
    }
  }

  return (
    <div className={styles.pageWrap}>
      <h1 className={styles.title}>Service Request Form</h1>

      <form onSubmit={handleSubmit} className={styles.formBox}>
        {/* Contact information group */}
        <div className={styles.sectionHeader}>1. Contact Information</div>

        <div className={styles.grid3}>
          <label className={styles.field}>
            <span className={styles.label}>Name</span>
            {/* Input binds value to form.name and updates state on change */}
            <input name="name" value={form.name} onChange={update} className={styles.input} />
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Phone number</span>
            <input name="phone" value={form.phone} onChange={update} className={styles.input} />
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Email address</span>
            <input name="email" value={form.email} onChange={update} className={styles.input} />
          </label>
        </div>

        {/* Device information group */}
        <div className={styles.sectionHeader}>Device Information</div>
        <div className={styles.grid2}>
          <label className={styles.field}>
            <span className={styles.label}>Device</span>
            {/* A select control; value maps to form.deviceSelect */}
            <select name="deviceSelect" value={form.deviceSelect} onChange={update} className={styles.input}>
              <option value="">Select a device here</option>
              <option>Desktop</option>
              <option>Laptop</option>
              <option>Tablet</option>
              <option>Phone</option>
            </select>
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Or specify</span>
            {/* Freeform device text */}
            <input name="deviceText" placeholder="Type your device here" value={form.deviceText} onChange={update} className={styles.input} />
          </label>
        </div>

        {/* Problem description group */}
        <div className={styles.sectionHeader}>2. Problem Description</div>
        <div className={styles.grid2}>
          <label className={styles.field}>
            <span className={styles.label}>When did the problem start?</span>
            <input name="started" value={form.started} onChange={update} className={styles.input} />
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
          <button type="submit" className={styles.submitBtn}>Submit</button>
        </div>

        {/* Status messages shown based on the `status` state */}
        {status === 'sending' && <p className={styles.message}>Sending...</p>}
        {status === 'submitted' && <p className={styles.success}>Submitted — admin will be notified.</p>}
        {status === 'error' && <p className={styles.error}>Error sending form. Check console.</p>}
      </form>
    </div>
  );
}
