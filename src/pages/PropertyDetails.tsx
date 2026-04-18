import React, { useEffect, useState } from 'react';
import { MapPin, BedDouble, Bath, Ruler, ParkingSquare, ShieldCheck, MessageCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useParams } from 'react-router-dom';
import { API_BASE_IMAGE_URL, API_BASE_URL } from '@/lib/api';


const PropertyDetails: React.FC = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<any>(null); // define your property shape for better typing

  useEffect(() => {
    // 👇 Replace this with real fetch logic
    const fetchProperty = async () => {
      const res = await fetch(`${API_BASE_URL}/properties/${id}`);
      const data = await res.json();
      console.log(data);
      setProperty(data);
    };
    fetchProperty();
  }, []);

        const [showModal, setShowModal] = useState(false);
        const [formData, setFormData] = useState({
          name: '',
          email: '',
          phone: '',
          notes: '',
          source: 'website',
        });
        const [errors, setErrors] = useState({ name: '', email: '', phone: '', notes: '' });
        const [success, setSuccess] = useState(false);

        const validate = () => {
            const newErrors = { name: '', email: '', phone: '', notes: '' };
            let isValid = true;
        
            if (!formData.name.trim()) {
              newErrors.name = 'Name is required';
              isValid = false;
            }
            if (!formData.phone.trim()) {
              newErrors.phone = 'Phone is required';
              isValid = false;
            }
            if (!formData.email.trim()) {
              newErrors.email = 'Email is required';
              isValid = false;
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
              newErrors.email = 'Email is invalid';
              isValid = false;
            }
            // if (!formData.notes.trim()) {
            //   newErrors.notes = 'Message is required';
            //   isValid = false;
            // }
        
            setErrors(newErrors);
            return isValid;
          };

          const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            if (!validate()) return;
            const propertyId = property?._id || '';

            try {
              const res = await fetch(`${API_BASE_URL}/leads`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  ...formData,
                  property_id: propertyId,
                }),
              });
          
              if (res.ok) {
                setSuccess(true);
                setTimeout(() => {
                  setShowModal(false);
                  setSuccess(false);
                  setFormData({ name: '', email: '', phone: '', notes: '', source: 'property-page' });
                }, 2000);
              } else {
                console.error('Submission failed');
              }
            } catch (err) {
              console.error('Error:', err);
            }
          };

          const handleWhatsappClick = (e: React.MouseEvent) => {
              e.stopPropagation(); // prevent the parent link click
              window.open("http://wa.me/+971522612156", '_blank'); // open external URL in new tab
            };

  return (
    <div className="min-h-screen bg-white">
      <Header variant='home'/>

      {/* Hero Section */}
      <div className="relative h-[400px] bg-cover bg-center" style={{ backgroundImage: `url('${API_BASE_IMAGE_URL + property?.image[0]}')` }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-white">
          <h1 className="text-4xl font-bold">{property?.name}</h1>
          <div className="flex items-center mt-2 text-blue-200">
            <MapPin className="h-5 w-5 mr-1" />
            <span>{property?.location}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Price and Features */}
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{property?.base_price} AED</h2>
            <div className="flex space-x-4 text-gray-600">
              <div className="flex items-center"><BedDouble className="h-5 w-5 mr-1" /> {property?.beds} Beds</div>
              <div className="flex items-center"><Bath className="h-5 w-5 mr-1" /> {property?.baths} Baths</div>
              <div className="flex items-center"><Ruler className="h-5 w-5 mr-1" />{property?.sqft} sqft</div>
            </div>
          </div>
          {/* Action Buttons */}
  <div className="flex mt-4 md:mt-0 space-x-3">
    <button
      onClick={() => setShowModal(true)}
      className="bg-primary text-white px-6 py-2 rounded-lg shadow hover:bg-primary transition"
    >
      Enquire Now
    </button>

    <a
      href={`https://wa.me/+971522612156?text=I'm%20interested%20in%20${encodeURIComponent(property?.name || 'this property')}`}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition flex items-center"
    >
      <MessageCircle className="w-5 h-5" />
      WhatsApp
    </a>
  </div>
        </div>

        {/* Description */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-2">Property Description</h3>
          <p className="text-gray-700 leading-relaxed">
            {property?.description}
          </p>
        </div>

        {/* Features */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4">Key Features</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-700">
            {property?.amenities.map((feature, index) => (
              <><div className="flex items-center"><ShieldCheck className="mr-2 text-green-500" /> {feature}</div></>              
            ))}
          </div>
        </div>

        {/* Gallery */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-4">Gallery</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {property?.image.map(g => (
              <img key={g} src={API_BASE_IMAGE_URL + g} alt={`Gallery ${g}`} className="rounded-lg object-cover w-full h-48" />
            ))}
          </div>
        </div>

        {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
      <h3 className="text-xl font-semibold mb-4">Enquire About This Property</h3>

      {success ? (
        <div className="text-green-600 font-medium text-center">Message Sent Successfully!</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full border border-gray-300 px-4 py-2 rounded"
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
          </div>
          <div>
            <input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full border border-gray-300 px-4 py-2 rounded"
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>
          <div>
            <input
              type="phone"
              placeholder="Your Phone"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              className="w-full border border-gray-300 px-4 py-2 rounded"
            />
            {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
          </div>
          <div>
            <textarea
              placeholder="Your Message"
              value={formData.notes}
              onChange={e => setFormData({ ...formData, notes: e.target.value })}
              className="w-full border border-gray-300 px-4 py-2 rounded resize-none"
              rows={4}
            />
            {errors.notes && <p className="text-sm text-red-500 mt-1">{errors.notes}</p>}
          </div>
          <button type="submit" className="bg-primary hover:bg-primary text-white px-4 py-2 rounded w-full" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      )}

      <button
        onClick={() => setShowModal(false)}
        className="absolute top-2 right-2 text-gray-500 hover:text-black"
      >
        ×
      </button>
    </div>
  </div>
)}


      </section>

      <Footer />
    </div>
  );
};

export default PropertyDetails;
