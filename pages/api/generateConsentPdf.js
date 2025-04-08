import nodemailer from 'nodemailer';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const formData = req.body;
        console.log("Processing form submission:", { 
            name: `${formData.givenNames} ${formData.surname}`,
            email: formData.email 
        });

        // Check if required data is present
        if (!formData.givenNames || !formData.surname) {
            return res.status(400).json({ error: 'Missing required form fields' });
        }

        // ✅ Debugging paths
        const currentDir = process.cwd();
        console.log("Current working directory:", currentDir);
        const publicDir = path.join(currentDir, 'public');
        console.log("Public directory:", publicDir);
        
        // ✅ Try multiple paths for the PDF template
        let pdfPath = path.join(publicDir, 'Consent Form.pdf');
        console.log("Attempting to load PDF from:", pdfPath);
        
        if (!fs.existsSync(pdfPath)) {
            // Try alternate path formats
            pdfPath = path.join(currentDir, 'public', 'Consent Form.pdf');
            console.log("Alternate path 1:", pdfPath);
            
            if (!fs.existsSync(pdfPath)) {
                pdfPath = path.resolve('./public/Consent Form.pdf');
                console.log("Alternate path 2:", pdfPath);
                
                if (!fs.existsSync(pdfPath)) {
                    console.error("PDF template not found at any path!");
                    return res.status(500).json({ error: 'PDF template not found. Please check the server logs.' });
                }
            }
        }

        console.log("PDF template found at:", pdfPath);
        const pdfBuffer = fs.readFileSync(pdfPath);
        const pdfDoc = await PDFDocument.load(pdfBuffer);

        // ✅ Get pages
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        const secondPage = pages.length > 1 ? pages[1] : pdfDoc.addPage();
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

        // ✅ Convert boolean `nonConsent` to "Yes" or "No"
        const nonConsentText = formData.nonConsent ? "I do not consent to my personal information being disclosed to the following" : "";

        // ✅ Fill in PDF form fields (with null checks)
        firstPage.drawText(formData.givenNames || '', { x: 50, y: 650, size: 12, font, color: rgb(0, 0, 0) });
        firstPage.drawText(formData.surname || '', { x: 305, y: 650, size: 12, font, color: rgb(0, 0, 0) });

        firstPage.drawText(formData.preferredNames || '', { x: 50, y: 613, size: 12, font, color: rgb(0, 0, 0) });
        firstPage.drawText(formData.dateOfBirth || '', { x: 305, y: 613, size: 12, font, color: rgb(0, 0, 0) });

        firstPage.drawText(formData.addressUnit || '', { x: 50, y: 576, size: 12, font, color: rgb(0, 0, 0) });
        firstPage.drawText(formData.addressSuburb || '', { x: 50, y: 540, size: 12, font, color: rgb(0, 0, 0) });

        firstPage.drawText(formData.phone || '', { x: 50, y: 503.5, size: 12, font, color: rgb(0, 0, 0) });
        firstPage.drawText(formData.email || '', { x: 305, y: 503.5, size: 12, font, color: rgb(0, 0, 0) });

        firstPage.drawText(formData.medicareNumber || '', { x: 50, y: 467, size: 12, font, color: rgb(0, 0, 0) });
        firstPage.drawText(formData.referenceNumber || '', { x: 305, y: 468, size: 12, font, color: rgb(0, 0, 0) });
        firstPage.drawText(formData.expiryDate || '', { x: 340, y: 456, size: 12, font, color: rgb(0, 0, 0) });

        firstPage.drawText(formData.insurer || '', { x: 50, y: 418.5, size: 12, font, color: rgb(0, 0, 0) });
        firstPage.drawText(formData.claimNumber || '', { x: 305, y: 418.5, size: 12, font, color: rgb(0, 0, 0) });

        firstPage.drawText(formData.dateOfInjury || '', { x: 50, y: 382, size: 12, font, color: rgb(0, 0, 0) });
        firstPage.drawText(formData.claimManager || '', { x: 305, y: 382, size: 12, font, color: rgb(0, 0, 0) });

        firstPage.drawText(formData.allergies || '', { x: 50, y: 344.5, size: 12, font, color: rgb(0, 0, 0) });

        firstPage.drawText(formData.alcohol || '', { x: 50, y: 298, size: 12, font, color: rgb(0, 0, 0) });
        firstPage.drawText(formData.smoke || '', { x: 305, y: 298, size: 12, font, color: rgb(0, 0, 0) });
        firstPage.drawText(formData.alcoholConsumptionPerWeek || '', { x: 50, y: 272, size: 12, font, color: rgb(0, 0, 0) });
        firstPage.drawText(formData.smokePerDay || '', { x: 405, y: 285, size: 12, font, color: rgb(0, 0, 0) });
        firstPage.drawText(formData.yearsSmoked || '', { x: 405, y: 272, size: 12, font, color: rgb(0, 0, 0) });
        firstPage.drawText(formData.quitWhen || '', { x: 405, y: 259, size: 12, font, color: rgb(0, 0, 0) });

        // ✅ Properly align medications (with safety checks)
        let medicationY = 188;
        if (Array.isArray(formData.medications)) {
            formData.medications.forEach(med => {
                firstPage.drawText(med.name || '', { x: 50, y: medicationY, size: 12, font, color: rgb(0, 0, 0) });
                firstPage.drawText(med.dosage || '', { x: 305, y: medicationY, size: 12, font, color: rgb(0, 0, 0) });
                medicationY -= 24;
            });
        }

        // ✅ Move "Patient Authority", "Non-Consent", and Signature fields to the second page
        secondPage.drawText(`${nonConsentText}`, { x: 130, y: 472, size: 12, font, color: rgb(0, 0, 0) });
        secondPage.drawText(formData.patientAuthority || '', { x: 50, y: 453, size: 12, font, color: rgb(0, 0, 0), maxWidth: 500, lineHeight: 14 });

        secondPage.drawText(formData.fullNameSignature || '', { x: 230, y: 415, size: 12, font, color: rgb(0, 0, 0) });

        secondPage.drawText(formData.dateSigned || '', { x: 110, y: 377, size: 12, font, color: rgb(0, 0, 0) });

        // ✅ Save the filled PDF
        console.log("Generating PDF document...");
        const filledPdfBytes = await pdfDoc.save();
        console.log("PDF generated successfully");

        // ✅ Test mode - skip email sending and return success
        if (process.env.NODE_ENV === 'development' && process.env.SKIP_EMAIL === 'true') {
            console.log("TEST MODE: Skipping email sending");
            return res.status(200).json({ 
                success: true, 
                message: "TEST MODE: PDF generated successfully, email sending skipped" 
            });
        }

        // ✅ Setup Nodemailer with Postmark SMTP
        console.log("Setting up email transport...");
        const transporter = nodemailer.createTransport({
            host: "smtp.postmarkapp.com",
            port: 587, 
            secure: false,
            auth: {
                user: "4abb7143-c4ec-4aa5-bd26-d256bb5791e2",
                pass: "4abb7143-c4ec-4aa5-bd26-d256bb5791e2",
            },
            // In development, ignore SSL certificate validation
            ...(process.env.NODE_ENV === 'development' ? {
                tls: {
                    rejectUnauthorized: false
                }
            } : {})
        });

        // ✅ Email options
        const mailOptions = {
            from: '"Specialist Plus" <elliot@proximo.life>',
            to: "elliotkoh9@gmail.com",
            bcc: ["elliot@proximo.life"],
            subject: `New Consent Form Submission - ${formData.givenNames} ${formData.surname}`,
            text: `
                A new consent form has been submitted.
        
                Patient Name: ${formData.givenNames} ${formData.surname}
                Date of Birth: ${formData.dateOfBirth}
                Phone: ${formData.phone}
                Email: ${formData.email}
            `,
            attachments: [
                {
                    filename: `Consent_Form_${formData.givenNames}_${formData.surname}.pdf`,
                    content: filledPdfBytes,
                    encoding: "base64",
                },
            ],
        };
        
        // ✅ Send email with Postmark
        try {
            console.log("Sending email via Postmark...");
            await transporter.sendMail(mailOptions);
            console.log("Email sent successfully");
        } catch (emailError) {
            console.error("Failed to send email:", emailError);
            
            // Return success for PDF generation but note email failure
            return res.status(200).json({ 
                success: true, 
                emailSuccess: false,
                message: "PDF was generated but email sending failed: " + emailError.message
            });
        }

        return res.status(200).json({ success: true, message: "Consent form emailed successfully" });

    } catch (error) {
        console.error("Error processing consent form:", error);
        return res.status(500).json({ 
            error: "Failed to process consent form", 
            message: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
}