import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { firstName, lastName, email, subjectInput, message } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !email || !subjectInput || !message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        console.log("Processing contact form submission:", { 
            name: `${firstName} ${lastName}`,
            email,
            subject: subjectInput
        });

        // Setup Nodemailer with Postmark SMTP
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

        // Email options
        const mailOptions = {
            from: '"Specialist Plus" <elliot@proximo.life>',
            to: "elliotkoh9@gmail.com", // Change to admin@specialistplus.com.au in production
            replyTo: email,
            subject: `${subjectInput} - ${firstName} ${lastName}`,
            text: `
                New contact form submission from the website.
                
                Name: ${firstName} ${lastName}
                Email: ${email}
                
                Message:
                ${message}
            `,
            html: `
                <h2>New contact form submission</h2>
                <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <h3>Message:</h3>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `
        };
        
        // Send email with Postmark
        try {
            console.log("Sending email via Postmark...");
            await transporter.sendMail(mailOptions);
            console.log("Email sent successfully");
        } catch (emailError) {
            console.error("Failed to send email:", emailError);
            
            return res.status(500).json({ 
                success: false, 
                emailSuccess: false,
                message: "Email sending failed: " + emailError.message
            });
        }

        return res.status(200).json({ success: true, message: "Contact form submitted successfully" });

    } catch (error) {
        console.error("Error processing contact form:", error);
        return res.status(500).json({ 
            error: "Failed to process contact form", 
            message: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
} 