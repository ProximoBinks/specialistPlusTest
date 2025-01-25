// pages/consent-form.js

'use client';
import { useState } from 'react';
import Layout from '@components/Layout';

export default function ConsentForm() {
    const [formData, setFormData] = useState({
        givenNames: '',
        surname: '',
        preferredNames: '',
        email: '',
        // Changed from dob to dateOfBirth
        dateOfBirth: '',
        // Changed from addressUnitStreet to addressUnit
        addressUnit: '',
        // Changed from addressSuburbPostcode to addressSuburb
        addressSuburb: '',
        phone: '',
        dateOfInjury: '',
        medicareNumber: '',
        referenceNumber: '',
        expiryDate: '',
        insurer: '',
        claimNumber: '',
        claimManager: '',
        allergies: '',
        // Matches the 'alcohol' field in __forms.html
        alcohol: 'Never',
        // Changed from alcoholConsumptionPerWeek to alcoholConsumption
        alcoholConsumption: '',
        // Changed from smokingStatus to smoke
        smoke: 'Never',
        // Changed from cigarettesPerDay to smokePerDay
        smokePerDay: '',
        yearsSmoked: '',
        // Changed from quitDate to quitWhen
        quitWhen: '',
        medications: [{ name: '', dosage: '' }],
        patientAuthority: '',
        nonConsent: '',
        fullNameSignature: '',
        dateSigned: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const addMedication = () => {
        setFormData({
            ...formData,
            medications: [...formData.medications, { name: '', dosage: '' }],
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleMedicationChange = (index, event) => {
        const newMedications = formData.medications.map((medication, medIndex) => {
            if (index === medIndex) {
                return { ...medication, [event.target.name]: event.target.value };
            }
            return medication;
        });
        setFormData({ ...formData, medications: newMedications });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Build a URLSearchParams body from the actual form element:
        const formDataObj = new FormData(e.target);
        const formDataString = new URLSearchParams(formDataObj).toString();

        try {
            const response = await fetch('/__forms.html', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formDataString,
            });

            if (response.ok) {
                setIsSuccess(true);
                setErrorMessage('');
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Layout title="Consent Form — Specialist Plus" description="">
            <div className="max-w-3xl mx-auto py-12 px-4">
                <h1 className="text-3xl font-bold mb-8">Consent Form</h1>
                <p className="mb-4">
                    All clients are required to complete the consent form below 48 hours prior to an appointment.
                </p>
                <form name="consent-form" onSubmit={handleSubmit}>
                    {/* Netlify form name markers */}
                    <input type="hidden" name="form-name" value="consent-form" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Personal Information */}
                        <div>
                            <label className="block">
                                Given names <span className="text-red-500">*</span>
                                <input
                                    type="text"
                                    name="givenNames"
                                    value={formData.givenNames}
                                    onChange={handleInputChange}
                                    className="w-full border rounded-md p-2"
                                    required
                                />
                            </label>
                        </div>

                        <div>
                            <label className="block">
                                Surname <span className="text-red-500">*</span>
                                <input
                                    type="text"
                                    name="surname"
                                    value={formData.surname}
                                    onChange={handleInputChange}
                                    className="w-full border rounded-md p-2"
                                    required
                                />
                            </label>
                        </div>

                        <div>
                            <label className="block">
                                Preferred names
                                <input
                                    type="text"
                                    name="preferredNames"
                                    value={formData.preferredNames}
                                    onChange={handleInputChange}
                                    className="w-full border rounded-md p-2"
                                />
                            </label>
                        </div>

                        <div>
                            <label className="block">
                                Email <span className="text-red-500">*</span>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full border rounded-md p-2"
                                    required
                                />
                            </label>
                        </div>

                        <div>
                            <label className="block">
                                Date of Birth <span className="text-red-500">*</span>
                                {/* Changed name from 'dob' to 'dateOfBirth' */}
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleInputChange}
                                    className="w-full border rounded-md p-2"
                                    required
                                />
                            </label>
                        </div>

                        {/* Address Information */}
                        <div>
                            <label className="block">
                                Address (Unit Number and Street) <span className="text-red-500">*</span>
                                {/* Changed name from 'addressUnitStreet' to 'addressUnit' */}
                                <input
                                    type="text"
                                    name="addressUnit"
                                    value={formData.addressUnit}
                                    onChange={handleInputChange}
                                    className="w-full border rounded-md p-2"
                                    required
                                />
                            </label>
                        </div>

                        <div>
                            <label className="block">
                                Address (Suburb and Postcode) <span className="text-red-500">*</span>
                                {/* Changed name from 'addressSuburbPostcode' to 'addressSuburb' */}
                                <input
                                    type="text"
                                    name="addressSuburb"
                                    value={formData.addressSuburb}
                                    onChange={handleInputChange}
                                    className="w-full border rounded-md p-2"
                                    required
                                />
                            </label>
                        </div>

                        <div>
                            <label className="block">
                                Phone <span className="text-red-500">*</span>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full border rounded-md p-2"
                                    required
                                />
                            </label>
                        </div>

                        {/* Injury and Insurance Information */}
                        <div>
                            <label className="block">
                                Date of Injury
                                <input
                                    type="date"
                                    name="dateOfInjury"
                                    value={formData.dateOfInjury}
                                    onChange={handleInputChange}
                                    className="w-full border rounded-md p-2"
                                />
                            </label>
                        </div>

                        <div>
                            <label className="block">
                                Medicare Number <span className="text-red-500">*</span>
                                <input
                                    type="text"
                                    name="medicareNumber"
                                    value={formData.medicareNumber}
                                    onChange={handleInputChange}
                                    className="w-full border rounded-md p-2"
                                    required
                                />
                            </label>
                        </div>

                        <div>
                            <label className="block">
                                Reference Number <span className="text-red-500">*</span>
                                <input
                                    type="text"
                                    name="referenceNumber"
                                    value={formData.referenceNumber}
                                    onChange={handleInputChange}
                                    className="w-full border rounded-md p-2"
                                    required
                                />
                            </label>
                        </div>

                        <div>
                            <label className="block">
                                Expiry Date <span className="text-red-500">*</span>
                                <input
                                    type="date"
                                    name="expiryDate"
                                    value={formData.expiryDate}
                                    onChange={handleInputChange}
                                    className="w-full border rounded-md p-2"
                                    required
                                />
                            </label>
                        </div>

                        <div>
                            <label className="block">
                                Insurer (ie. EML)
                                <input
                                    type="text"
                                    name="insurer"
                                    value={formData.insurer}
                                    onChange={handleInputChange}
                                    className="w-full border rounded-md p-2"
                                />
                            </label>
                        </div>

                        <div>
                            <label className="block">
                                Claim Number
                                <input
                                    type="text"
                                    name="claimNumber"
                                    value={formData.claimNumber}
                                    onChange={handleInputChange}
                                    className="w-full border rounded-md p-2"
                                />
                            </label>
                        </div>

                        <div>
                            <label className="block">
                                Claim Manager
                                <input
                                    type="text"
                                    name="claimManager"
                                    value={formData.claimManager}
                                    onChange={handleInputChange}
                                    className="w-full border rounded-md p-2"
                                />
                            </label>
                        </div>

                        <div>
                            <label className="block">
                                Allergies
                                <input
                                    type="text"
                                    name="allergies"
                                    value={formData.allergies}
                                    onChange={handleInputChange}
                                    className="w-full border rounded-md p-2"
                                />
                            </label>
                        </div>

                        {/* Alcohol and Smoking Questions */}
                        <div>
                            <label className="block">
                                Do you drink alcohol? <span className="text-red-500">*</span>
                                <div className="flex items-center space-x-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="alcohol"
                                            value="Never"
                                            checked={formData.alcohol === 'Never'}
                                            onChange={handleInputChange}
                                            className="form-radio"
                                            required
                                        />
                                        <span className="ml-2">Never</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="alcohol"
                                            value="Yes"
                                            checked={formData.alcohol === 'Yes'}
                                            onChange={handleInputChange}
                                            className="form-radio"
                                            required
                                        />
                                        <span className="ml-2">Yes</span>
                                    </label>
                                </div>
                            </label>
                        </div>

                        {formData.alcohol === 'Yes' && (
                            <div>
                                <label className="block">
                                    Alcohol Consumption Per Week
                                    {/* Changed name from 'alcoholConsumptionPerWeek' to 'alcoholConsumption' */}
                                    <input
                                        type="number"
                                        name="alcoholConsumption"
                                        value={formData.alcoholConsumption}
                                        onChange={handleInputChange}
                                        className="w-full border rounded-md p-2"
                                        required
                                    />
                                </label>
                            </div>
                        )}

                        <div>
                            <label className="block">
                                Do you smoke? <span className="text-red-500">*</span>
                                <div className="flex items-center space-x-4">
                                    <label className="inline-flex items-center">
                                        {/* Changed name from 'smokingStatus' to 'smoke' */}
                                        <input
                                            type="radio"
                                            name="smoke"
                                            value="Never"
                                            checked={formData.smoke === 'Never'}
                                            onChange={handleInputChange}
                                            className="form-radio"
                                            required
                                        />
                                        <span className="ml-2">Never</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="smoke"
                                            value="Yes"
                                            checked={formData.smoke === 'Yes'}
                                            onChange={handleInputChange}
                                            className="form-radio"
                                            required
                                        />
                                        <span className="ml-2">Yes</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="smoke"
                                            value="Quit"
                                            checked={formData.smoke === 'Quit'}
                                            onChange={handleInputChange}
                                            className="form-radio"
                                            required
                                        />
                                        <span className="ml-2">Quit</span>
                                    </label>
                                </div>
                            </label>
                        </div>

                        {formData.smoke === 'Yes' && (
                            <>
                                <div>
                                    <label className="block">
                                        If Yes, how many per day
                                        {/* Changed name from 'cigarettesPerDay' to 'smokePerDay' */}
                                        <input
                                            type="number"
                                            name="smokePerDay"
                                            value={formData.smokePerDay}
                                            onChange={handleInputChange}
                                            className="w-full border rounded-md p-2"
                                            required
                                        />
                                    </label>
                                </div>

                                <div>
                                    <label className="block">
                                        If Yes, years smoked
                                        {/* 'yearsSmoked' already matches the hidden form */}
                                        <input
                                            type="number"
                                            name="yearsSmoked"
                                            value={formData.yearsSmoked}
                                            onChange={handleInputChange}
                                            className="w-full border rounded-md p-2"
                                            required
                                        />
                                    </label>
                                </div>
                            </>
                        )}

                        {formData.smoke === 'Quit' && (
                            <div>
                                <label className="block">
                                    If Quit, When did you quit
                                    {/* Changed name from 'quitDate' to 'quitWhen' */}
                                    <input
                                        type="date"
                                        name="quitWhen"
                                        value={formData.quitWhen}
                                        onChange={handleInputChange}
                                        className="w-full border rounded-md p-2"
                                        required
                                    />
                                </label>
                            </div>
                        )}

                        {/* Medications */}
                        {formData.medications.map((medication, index) => (
                            <div key={index} className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block">
                                        Medication Name
                                        <input
                                            type="text"
                                            name="name"
                                            value={medication.name}
                                            onChange={(e) => handleMedicationChange(index, e)}
                                            className="w-full border rounded-md p-2"
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label className="block">
                                        Dosage
                                        <input
                                            type="text"
                                            name="dosage"
                                            value={medication.dosage}
                                            onChange={(e) => handleMedicationChange(index, e)}
                                            className="w-full border rounded-md p-2"
                                        />
                                    </label>
                                </div>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addMedication}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md h-12"
                        >
                            Add More Medications
                        </button>

                        {/* Patient Authority */}
                        <div className="mt-8">
                            <label className="block">
                                Patient Authority <span className="text-red-500">*</span>
                                <textarea
                                    name="patientAuthority"
                                    value={formData.patientAuthority}
                                    onChange={handleInputChange}
                                    className="w-full border rounded-md p-2"
                                    required
                                />
                            </label>
                        </div>

                        <div className="mt-4">
                            <label className="block">
                                Do not consent to my personal information being disclosed to the following:
                                <input
                                    type="text"
                                    name="nonConsent"
                                    value={formData.nonConsent}
                                    onChange={handleInputChange}
                                    className="w-full border rounded-md p-2"
                                />
                            </label>
                        </div>

                        {/* Signature Section */}
                        <div className="mt-8">
                            <label className="block">
                                Enter Your Full Name As A Signature <span className="text-red-500">*</span>
                                <input
                                    type="text"
                                    name="fullNameSignature"
                                    value={formData.fullNameSignature}
                                    onChange={handleInputChange}
                                    className="w-full border rounded-md p-2"
                                    required
                                />
                            </label>
                        </div>

                        <div className="mt-4">
                            <label className="block">
                                Date Signed <span className="text-red-500">*</span>
                                <input
                                    type="date"
                                    name="dateSigned"
                                    value={formData.dateSigned}
                                    onChange={handleInputChange}
                                    className="w-full border rounded-md p-2"
                                    required
                                />
                            </label>
                        </div>

                        <div className="mt-8">
                            <button
                                type="submit"
                                className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>
                    </div>
                </form>

                {isSuccess && <p className="mt-4 text-green-600">Form submitted successfully!</p>}
                {errorMessage && <p className="mt-4 text-red-600">Error: {errorMessage}</p>}
            </div>
        </Layout>
    );
}
