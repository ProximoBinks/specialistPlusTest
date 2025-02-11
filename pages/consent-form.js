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
        dateOfBirth: '',
        addressUnit: '',
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
        alcohol: 'Never',
        alcoholConsumptionPerWeek: '',
        smoke: 'Never',
        smokePerDay: '',
        yearsSmoked: '',
        quitWhen: '',
        medications: [{ name: '', dosage: '' }],
        patientAuthority: '',
        nonConsent: '',
        fullNameSignature: '',
        dateSigned: '',
        subject: '',
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
        const { name, type, checked, value } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
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

        // Prepare the data for the second request (__forms.html)
        const formDataObj = new FormData(e.target);

        // Serialize medications as JSON (assuming `formData` has { medications: [...] })
        formDataObj.set('medications', JSON.stringify(formData.medications));

        const formDataString = new URLSearchParams(formDataObj).toString();

        // We will store error messages from each request here
        const errors = [];

        // 1) Attempt PDF/email generation
        try {
            const responsePdf = await fetch('/api/generateConsentPdf', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!responsePdf.ok) {
                throw new Error('Failed to generate PDF');
            }
        } catch (error) {
            console.error(error);
            errors.push(error.message);
        }

        // 2) Attempt form submission
        try {
            const responseForm = await fetch('/__forms.html', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formDataString,
            });

            if (!responseForm.ok) {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error(error);
            errors.push(error.message);
        }

        // Check if there were any errors
        if (errors.length > 0) {
            setErrorMessage(errors.join(' | '));
        } else {
            setIsSuccess(true);
            setErrorMessage('');
        }

        setIsSubmitting(false);
    };

    return (
        <Layout
            title="Patient Consent Form — Specialist Plus"
            description="Complete the Specialist Plus consent form to authorize medical treatment and share relevant health information."
            keywords="Specialist Plus consent form, medical authorization, patient agreement, treatment approval"
            ogImage="/consent-form-og-image.jpg"
        >
            <div className="max-w-3xl mx-auto py-12 px-5">
                <h1 className="text-3xl font-bold mb-8">Consent Form</h1>
                <p className="mb-4">
                    All clients are required to complete the consent form below 48 hours prior to an appointment.
                </p>
                <form className="flex md:hidden" name="consent-form" onSubmit={handleSubmit}>
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

                        <hr className="my-4 border-gray-300" />
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
                                    type="month"
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

                        <hr className="my-4 border-gray-300" />
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
                                    {/* Changed name from 'alcoholConsumptionPerWeekPerWeek' to 'alcoholConsumptionPerWeek' */}
                                    <input
                                        type="number"
                                        name="alcoholConsumptionPerWeek"
                                        value={formData.alcoholConsumptionPerWeek}
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

                        <hr className="my-4 border-gray-300" />
                        {/* Medications */}
                        <div className="font-gotham-bold">Medications</div>
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

                        <hr className="my-4 border-gray-300" />
                        {/* Patient Authority */}
                        <div className="mt-4">
                            <label className="block">
                                <span className="font-gotham-bold">Patient Authority</span>
                                <p className="pt-4">Your authority for the release and collection of medical information<br></br><br></br>
                                    I authorise and consent to any health professional, legal representative, rehabilitation provider, case manager, or Specialist Plus provider disclosing, releasing, or discussing records containing my personal medical information with one another. I understand this information is required for determining and managing my compensation claim, as well as assisting with my treatment.<br></br><br></br>
                                    I further authorise and consent that a photocopy of this authority will be sufficient proof of my consent to discuss or provide the requested medical information.</p>

                            </label>
                        </div>

                        <div className="mt-4">
                            <label className="inline-flex items-center">
                                {/* Change this to a checkbox */}
                                <input
                                    type="checkbox"
                                    name="nonConsent"
                                    checked={formData.nonConsent}
                                    onChange={handleInputChange}
                                    className="form-checkbox h-4 w-4"
                                />
                                <span className="ml-2">
                                    Do not consent to my personal information being disclosed to the following
                                </span>

                            </label>
                            <textarea
                                name="patientAuthority"
                                value={formData.patientAuthority}
                                onChange={handleInputChange}
                                className="w-full border rounded-md p-2"
                            />
                        </div>
                        <input
                            type="hidden"
                            name="subject"
                            value={`Consent Form - ${formData.givenNames} ${formData.surname}`}
                        />

                        <hr className="my-4 border-gray-300" />
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
                <form name="consent-form" onSubmit={handleSubmit} className="hidden md:flex">
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


                        <hr className="col-span-2 my-4 border-gray-300" />

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
                                    type="month"
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


                        <hr className="col-span-2 my-4 border-gray-300" />

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
                                    <input
                                        type="number"
                                        name="alcoholConsumptionPerWeek"
                                        value={formData.alcoholConsumptionPerWeek}
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


                        <hr className="col-span-2 my-4 border-gray-300" />

                        {/* Medications */}
                        <div className="col-span-2 font-gotham-bold">Medications</div>

                        {formData.medications.map((medication, index) => (
                            <div key={index} className="grid grid-cols-2 gap-4 col-span-2">
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

                        <div className="col-span-2">
                            <button
                                type="button"
                                onClick={addMedication}
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md h-12"
                            >
                                Add More Medications
                            </button>
                        </div>


                        <hr className="col-span-2 my-4 border-gray-300" />

                        {/* Patient Authority (single-column) */}
                        <div className="mt-8 col-span-2">
                            <label className="block">
                                <span className="font-gotham-bold">
                                    Patient Authority
                                </span>
                                <p className="mt-2">
                                    Your authority for the release and collection of medical information<br />
                                    <br />
                                    I authorise and consent to any health professional, legal representative,
                                    rehabilitation provider, case manager, or Specialist Plus provider disclosing,
                                    releasing, or discussing records containing my personal medical information with one
                                    another. I understand this information is required for determining and managing my
                                    compensation claim, as well as assisting with my treatment.
                                    <br />
                                    <br />
                                    I further authorise and consent that a photocopy of this authority will be sufficient
                                    proof of my consent to discuss or provide the requested medical information.
                                </p>

                            </label>
                        </div>

                        <div className="mt-4 col-span-2">
                            <label className="inline-flex items-center">
                                {/* Change this to a checkbox */}
                                <input
                                    type="checkbox"
                                    name="nonConsent"
                                    checked={formData.nonConsent}
                                    onChange={handleInputChange}
                                    className="form-checkbox h-4 w-4"
                                />
                                <span className="ml-2">
                                    Do not consent to my personal information being disclosed to the following
                                </span>
                            </label>
                            <textarea
                                name="patientAuthority"
                                value={formData.patientAuthority}
                                onChange={handleInputChange}
                                className="w-full border rounded-md p-2 mt-2"
                            />
                        </div>

                        {/* We'll store the subject in a hidden field */}
                        <input
                            type="hidden"
                            name="subject"
                            value={`Consent Form - ${formData.givenNames} ${formData.surname}`}
                        />


                        <hr className="col-span-2 my-4 border-gray-300" />

                        {/* Signature Section */}
                        <div className="mt-4">
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