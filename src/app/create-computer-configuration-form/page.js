"use client"

import { useState, useEffect } from 'react'

export default function CreateComputerConfigurationForm() {
    const [status, setStatus] = useState(null)
    const [cpus, setCpus] = useState([])
    const [gpus, setGpus] = useState([])
    const [motherboards, setMotherboards] = useState([])
    const [memories, setMemories] = useState([])
    const [storages, setStorages] = useState([])
    const [psus, setPsus] = useState([])
    const [casesList, setCasesList] = useState([])
    const [coolings, setCoolings] = useState([])
    const [operatingSystems, setOperatingSystems] = useState([])
    const [networkings, setNetworkings] = useState([])

    useEffect(() => {
        const types = [
            'cpu',
            'gpu',
            'motherboard',
            'memory',
            'storage',
            'psu',
            'case',
            'cooling',
            'operating_system',
            'networking',
        ]

        const setters = {
            cpu: setCpus,
            gpu: setGpus,
            motherboard: setMotherboards,
            memory: setMemories,
            storage: setStorages,
            psu: setPsus,
            case: setCasesList,
            cooling: setCoolings,
            operating_system: setOperatingSystems,
            networking: setNetworkings,
        }

        async function fetchAll() {
            await Promise.all(types.map(async (t) => {
                try {
                    const res = await fetch(`/api/options?type=${encodeURIComponent(t)}`)
                    if (!res.ok) return setters[t]([])
                    const json = await res.json()
                    setters[t](json.data || [])
                } catch (err) {
                    console.error('Error fetching options', t, err)
                    setters[t]([])
                }
            }))
        }

        fetchAll()
    }, [])

    // make select placeholder option appear lighter; when user chooses a real option
    // we'll switch the select text color to dark so the real choice is more visible.
    function handleSelectChange(e) {
        const el = e.target
        if (!el) return
        if (el.value === '') {
            el.classList.add('text-gray-400')
            el.classList.remove('text-black')
        } else {
            el.classList.remove('text-gray-400')
            el.classList.add('text-black')
        }
    }

    function formatPrice(v) {
        if (v === undefined || v === null || v === '') return ''
        const n = Number(v)
        if (Number.isNaN(n)) return String(v)
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)
    }

    async function handleSubmit(e) {
     
        e.preventDefault()

        const form = e.currentTarget
        setStatus('sending')

        const fd = new FormData(form)
        const payload = {
            name: fd.get('Name') || null,
            phone: fd.get('Phone number') || null,
            email: fd.get('Email address') || null,
            budgetRange: fd.get('Budget Range') || null,
            intendedUse: fd.get('Intended Use') || null,
            cpu: fd.get('cpu') || null,
            gpu: fd.get('gpu') || null,
            motherboard: fd.get('motherboard') || null,
            memory: fd.get('memory') || null,
            storage: fd.get('storage') || null,
            psu: fd.get('psu') || null,
            case: fd.get('case') || null,
            // Optional additional options
            cooling: fd.get('cooling') || null,
            operatingSystem: fd.get('operatingSystem') || null,
            networking: fd.get('networking') || null,
            otherRequests: (fd.get('otherRequests') ? String(fd.get('otherRequests')).trim() : null),
        }

        // debug: log payload so we can inspect in browser DevTools before sending
        console.log('Submitting configuration payload:', payload)

        try {
            const res = await fetch('/api/config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })

            if (!res.ok) throw new Error(await res.text())
            setStatus('submitted')
            if (form && typeof form.reset === 'function') form.reset()
        } catch (err) {
            console.error(err)
            setStatus('error')
        }
    }

    return (
        <main className="min-h-screen bg-white text-black">
                <form onSubmit={handleSubmit} className="mx-auto max-w-3xl px-12,py-12">
                     <h1 className="text-3xl mb-6">Computer Configuration Form</h1>
                    {/* Boundary line wrapping two section and more in the future depended on it*/}
                    <div className="border border-neutral-300 bg-white, px-6 py-4">
                        <h2 className="text-5xl,mt-6, mb-6 ">1.Customer Information</h2>
                        {/* Displays as 3-column grid on medium to larger displays for section 1*/}
                        <div className="grid grid-cols-3 gaps-3 grid-flow-row, flex flex-col gap-6">
                            <div>
                                <label className="block text-sm mb1" htmlFor="Name">Name</label>
                                <input type="text" name="Name" placeholder="Name" className="w-55 border border-black px-3 py-2"/>
                            </div>

                            <div>    
                                <label className="block test-sm mb1" htmlFor="Phone number">Phone number</label>
                                <input type="tel" name="Phone number" placeholder="Phone number" className="w-55 border border-black px-3 py-2"/>
                            </div>
                            <div>
                                <label className="block test-sm mb1" htmlFor="Email address">Email address</label>
                                <input type="email" name="Email address" placeholder="Email address" className="w-55 border border-black  px-3 py-2"/>
                            </div>
                            <div>
                                <label className="block test-sm mb1" htmlFor="Budget Range">Budget Range</label>
                                <input type="text" name="Budget Range" placeholder="Budget Range" className="w-55 border border-black  px-3 py-2"/>
                            </div>
                            <div>
                                <label className="block test-sm mb1" htmlFor="Intended Use">Intended Use</label>
                                <input type="text" name="Intended Use" placeholder="Intended Use" className="w-55 border border-black  px-3 py-2"/>
                            </div>
                        </div>
                        {/* end of Section 1 list*/}
                        <h3 className="mt-6 mb-6">2. Core Components</h3>
                        {/* Section 2 starts here*/}
                        <div className="grid grid-cols-3 gaps-3 grid-flow-row, flex flex-col gap-6">
                            <div>
                                <label className="block text-sm mb1" htmlFor="Processor (CPU)">1.Processor (CPU)</label>
                                <select name="cpu" onChange={handleSelectChange} className="w-55 border border-neutral-300 py-2 bg-white text-gray-400">
                                    <option value="">Select a CPU</option>
                                    {Array.isArray(cpus) && cpus.map((c) => (
                                        <option key={c.id ?? c.name} value={c.value ?? c.name}>{c.name}{c.price != null ? ` \u2014 ${formatPrice(c.price)}` : ''}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block test-sm mb1" htmlFor="Graphic Card">2.Graphic Card (GPU)</label>
                                <select name="gpu" onChange={handleSelectChange} className="w-55 border border-neutral-300 py-2 bg-white text-gray-400">
                                    <option value="">Select a GPU</option>
                                    {Array.isArray(gpus) && gpus.map((g) => (
                                        <option key={g.id ?? g.name} value={g.value ?? g.name}>{g.name}{g.price != null ? ` \u2014 ${formatPrice(g.price)}` : ''}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block test-sm mb1" htmlFor="Motherboard">3.Motherboard</label>
                                <select name="motherboard" onChange={handleSelectChange} className="w-55 border border-neutral-300 py-2 bg-white text-gray-400">
                                    <option value="">Select a Motherboard</option>
                                    {Array.isArray(motherboards) && motherboards.map((m) => (
                                        <option key={m.id ?? m.name} value={m.value ?? m.name}>{m.name}{m.price != null ? ` \u2014 ${formatPrice(m.price)}` : ''}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block test-sm mb1" htmlFor="Memory">4.Memory (RAM)</label>
                                <select name="memory" onChange={handleSelectChange} className="w-55 border border-neutral-300 py-2 bg-white text-gray-400">
                                    <option value="">Select RAM Size</option>
                                    {Array.isArray(memories) && memories.map((m) => (
                                        <option key={m.id ?? m.name} value={m.value ?? m.name}>{m.name}{m.price != null ? ` \u2014 ${formatPrice(m.price)}` : ''}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block test-sm mb1" htmlFor="Storage">5.Storage</label>
                                <select name="storage" onChange={handleSelectChange} className="w-55 border border-neutral-300 py-2 bg-white text-gray-400">
                                    <option value="">Select Storage Option</option>
                                    {Array.isArray(storages) && storages.map((s) => (
                                        <option key={s.id ?? s.name} value={s.value ?? s.name}>{s.name}{s.price != null ? ` \u2014 ${formatPrice(s.price)}` : ''}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block test-sm mb1" htmlFor="Power Supply Unit (PSU)">6.Power Supply Unit (PSU)</label>
                                <select name="psu" onChange={handleSelectChange} className="w-55 border border-neutral-300 py-2 bg-white text-gray-400">
                                    <option value="">Select a PSU</option>
                                    {Array.isArray(psus) && psus.map((p) => (
                                        <option key={p.id ?? p.name} value={p.value ?? p.name}>{p.name}{p.price != null ? ` \u2014 ${formatPrice(p.price)}` : ''}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block test-sm mb1" htmlFor="Computer Case">7.Computer Case</label>
                                <select name="case" onChange={handleSelectChange} className="w-55 border border-neutral-300 py-2 bg-white text-gray-400">
                                    <option value="">Select a Case</option>
                                    {Array.isArray(casesList) && casesList.map((c) => (
                                        <option key={c.id ?? c.name} value={c.value ?? c.name}>{c.name}{c.price != null ? ` \u2014 ${formatPrice(c.price)}` : ''}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        {/* end of Section 2 list*/}
                        {/* Section 3: Additional Options (optional) */}
                        <h3 className="mt-6 mb-4">3. Additional Options</h3>
                        <div className="grid grid-cols-3 gaps-3 grid-flow-row, flex flex-col gap-6">
                            <div>
                                <label className="block text-sm mb1" htmlFor="Cooling">1. Cooling</label>
                                <select name="cooling" onChange={handleSelectChange} className="w-55 border border-neutral-300 py-2 bg-white text-gray-400">
                                    <option value="">Select Cooling Option</option>
                                    {Array.isArray(coolings) && coolings.map((c) => (
                                        <option key={c.id ?? c.name} value={c.value ?? c.name}>{c.name}{c.price != null ? ` \u2014 ${formatPrice(c.price)}` : ''}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block test-sm mb1" htmlFor="Operating System">2. Operating System</label>
                                <select name="operatingSystem" onChange={handleSelectChange} className="w-55 border border-neutral-300 py-2 bg-white text-gray-400">
                                    <option value="">Select an OS</option>
                                    {Array.isArray(operatingSystems) && operatingSystems.map((o) => (
                                        <option key={o.id ?? o.name} value={o.value ?? o.name}>{o.name}{o.price != null ? ` \u2014 ${formatPrice(o.price)}` : ''}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block test-sm mb1" htmlFor="Networking">3. Networking</label>
                                <select name="networking" onChange={handleSelectChange} className="w-55 border border-neutral-300 py-2 bg-white text-gray-400">
                                    <option value="">Select Networking Option</option>
                                    {Array.isArray(networkings) && networkings.map((n) => (
                                        <option key={n.id ?? n.name} value={n.value ?? n.name}>{n.name}{n.price != null ? ` \u2014 ${formatPrice(n.price)}` : ''}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Section 4: Other requests / Questions */}
                        <h3 className="mt-6 mb-2">4. Other request / Questions</h3>
                        <div>
                            <label className="sr-only" htmlFor="otherRequests">Other request / Questions</label>
                            <textarea id="otherRequests" name="otherRequests" rows={6} placeholder="Additional info, special requests, or questions" onInput={handleSelectChange} className="w-full border border-neutral-300 px-3 py-2 placeholder-gray-400 bg-white text-gray-400"></textarea>
                        </div>
                    </div>

                    {/* submit area */}
                    <div className="mt-6 flex justify-end">
                        <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded-md">Submit Configuration</button>
                    </div>

                    {/* status messages */}
                    {status === 'sending' && <p className="mt-4 text-center text-sm">Sending…</p>}
                    {status === 'submitted' && <p className="mt-4 text-center text-sm text-green-600">Submitted — we'll contact you soon.</p>}
                    {status === 'error' && <p className="mt-4 text-center text-sm text-red-600">Error sending — try again.</p>}

                </form>
        </main>
    );
}