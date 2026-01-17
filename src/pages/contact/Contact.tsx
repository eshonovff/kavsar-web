import { type FC } from 'react';
import ContactForm from '../../components/contactForm/ContactForm'; 
const Contact: FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1 container mx-auto px-4 py-8 pb-24 lg:pb-8">
                <ContactForm />
            </main> 
        </div>
    );
};

export default Contact;
