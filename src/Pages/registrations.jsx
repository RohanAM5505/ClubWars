import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clubwarBg from '../assets/clubwar_bg.png';

const RegistrationPage = () => {
  // Country codes with flags
  const countryCodes = [
    { code: '+91', country: 'India', flag: '🇮🇳', length: 10 },
    { code: '+1', country: 'USA/Canada', flag: '🇺🇸', length: 10 },
    { code: '+44', country: 'UK', flag: '🇬🇧', length: 10 },
    { code: '+86', country: 'China', flag: '🇨🇳', length: 11 },
    { code: '+81', country: 'Japan', flag: '🇯🇵', length: 10 },
    { code: '+82', country: 'South Korea', flag: '🇰🇷', length: 10 },
    { code: '+65', country: 'Singapore', flag: '🇸🇬', length: 8 },
    { code: '+971', country: 'UAE', flag: '🇦🇪', length: 9 },
    { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦', length: 9 },
    { code: '+61', country: 'Australia', flag: '🇦🇺', length: 9 },
    { code: '+64', country: 'New Zealand', flag: '🇳🇿', length: 9 },
    { code: '+49', country: 'Germany', flag: '🇩🇪', length: 10 },
    { code: '+33', country: 'France', flag: '🇫🇷', length: 9 },
    { code: '+39', country: 'Italy', flag: '🇮🇹', length: 10 },
    { code: '+34', country: 'Spain', flag: '🇪🇸', length: 9 },
    { code: '+7', country: 'Russia', flag: '🇷🇺', length: 10 },
    { code: '+55', country: 'Brazil', flag: '🇧🇷', length: 11 },
    { code: '+52', country: 'Mexico', flag: '🇲🇽', length: 10 },
    { code: '+27', country: 'South Africa', flag: '🇿🇦', length: 9 },
    { code: '+20', country: 'Egypt', flag: '🇪🇬', length: 10 },
    { code: '+234', country: 'Nigeria', flag: '🇳🇬', length: 10 },
    { code: '+254', country: 'Kenya', flag: '🇰🇪', length: 10 },
    { code: '+60', country: 'Malaysia', flag: '🇲🇾', length: 9 },
    { code: '+62', country: 'Indonesia', flag: '🇮🇩', length: 10 },
    { code: '+63', country: 'Philippines', flag: '🇵🇭', length: 10 },
    { code: '+66', country: 'Thailand', flag: '🇹🇭', length: 9 },
    { code: '+84', country: 'Vietnam', flag: '🇻🇳', length: 9 },
    { code: '+880', country: 'Bangladesh', flag: '🇧🇩', length: 10 },
    { code: '+92', country: 'Pakistan', flag: '🇵🇰', length: 10 },
    { code: '+94', country: 'Sri Lanka', flag: '🇱🇰', length: 9 },
    { code: '+977', country: 'Nepal', flag: '🇳🇵', length: 10 },
    { code: '+90', country: 'Turkey', flag: '🇹🇷', length: 10 },
    { code: '+98', country: 'Iran', flag: '🇮🇷', length: 10 },
    { code: '+962', country: 'Jordan', flag: '🇯🇴', length: 9 },
    { code: '+974', country: 'Qatar', flag: '🇶🇦', length: 8 },
    { code: '+968', country: 'Oman', flag: '🇴🇲', length: 8 },
    { code: '+965', country: 'Kuwait', flag: '🇰🇼', length: 8 },
    { code: '+973', country: 'Bahrain', flag: '🇧🇭', length: 8 },
    { code: '+961', country: 'Lebanon', flag: '🇱🇧', length: 8 },
    { code: '+972', country: 'Israel', flag: '🇮🇱', length: 9 },
    { code: '+30', country: 'Greece', flag: '🇬🇷', length: 10 },
    { code: '+351', country: 'Portugal', flag: '🇵🇹', length: 9 },
    { code: '+31', country: 'Netherlands', flag: '🇳🇱', length: 9 },
    { code: '+32', country: 'Belgium', flag: '🇧🇪', length: 9 },
    { code: '+41', country: 'Switzerland', flag: '🇨🇭', length: 9 },
    { code: '+43', country: 'Austria', flag: '🇦🇹', length: 10 },
    { code: '+45', country: 'Denmark', flag: '🇩🇰', length: 8 },
    { code: '+46', country: 'Sweden', flag: '🇸🇪', length: 9 },
    { code: '+47', country: 'Norway', flag: '🇳🇴', length: 8 },
    { code: '+358', country: 'Finland', flag: '🇫🇮', length: 9 },
    { code: '+48', country: 'Poland', flag: '🇵🇱', length: 9 },
    { code: '+420', country: 'Czech Republic', flag: '🇨🇿', length: 9 },
    { code: '+36', country: 'Hungary', flag: '🇭🇺', length: 9 },
    { code: '+40', country: 'Romania', flag: '🇷🇴', length: 10 },
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    countryCode: '+91',
    phoneNumber: '',
    role: '',
    // Exporter fields
    companyName: '',
    originLocation: '',
    destinationLocation: '',
    cargoType: '',
    // Logistics Provider fields
    providerName: '',
    operatingPorts: [],
    routes: [{ source: '', destination: '' }],
    containerTypes: []
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [focusedField, setFocusedField] = useState(null);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginErrors, setLoginErrors] = useState({});
  const [loginTouched, setLoginTouched] = useState({});
  const [isLoginSubmitting, setIsLoginSubmitting] = useState(false);
  const [loginStatus, setLoginStatus] = useState(null);

  const cargoTypes = [
    'Dry Bulk',
    'Liquid Bulk',
    'Containerized',
    'Refrigerated',
    'Hazardous Materials',
    'Perishables',
    'Heavy Equipment',
    'General Cargo'
  ];

  const containerTypesList = [
    '20ft Standard',
    '40ft Standard',
    '40ft High Cube',
    '20ft Refrigerated',
    '40ft Refrigerated',
    '20ft Open Top',
    '40ft Open Top',
    'Tank Container',
    'Flat Rack'
  ];

  const portsList = [
    'Shanghai Port',
    'Singapore Port',
    'Ningbo-Zhoushan Port',
    'Shenzhen Port',
    'Guangzhou Port',
    'Busan Port',
    'Qingdao Port',
    'Hong Kong Port',
    'Tianjin Port',
    'Rotterdam Port',
    'Port Klang',
    'Antwerp Port',
    'Xiamen Port',
    'Kaohsiung Port',
    'Los Angeles Port',
    'Hamburg Port',
    'Long Beach Port',
    'New York/New Jersey Port',
    'Dubai Port',
    'Tanjung Pelepas Port'
  ];

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /[0-9]/.test(password) &&
           /[!@#$%^&*]/.test(password);
  };

  const validateLoginField = (name, value) => {
    let error = '';
    switch (name) {
      case 'email':
        if (!value) error = 'Email is required';
        else if (!validateEmail(value)) error = 'Invalid email format';
        break;
      case 'password':
        if (!value) error = 'Password is required';
        else if (!validatePassword(value))
          error = 'Password must be 8+ chars with uppercase, lowercase, number, and special character (!@#$%^&*)';
        break;
      default:
        break;
    }
    return error;
  };

  const validatePhoneNumber = (phone, countryCode) => {
    // Remove spaces and special characters
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    
    // Find the country data
    const countryData = countryCodes.find(c => c.code === countryCode);
    if (!countryData) return false;
    
    // Check if phone number has only digits
    if (!/^\d+$/.test(cleanPhone)) return false;
    
    // Check length
    return cleanPhone.length === countryData.length;
  };

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Name is required';
        else if (value.trim().length < 2) error = 'Name must be at least 2 characters';
        else if (!/^[a-zA-Z\s]+$/.test(value)) error = 'Name can only contain letters';
        break;
      case 'email':
        if (!value) error = 'Email is required';
        else if (!validateEmail(value)) error = 'Invalid email format';
        break;
      case 'password':
        if (!value) error = 'Password is required';
        else if (!validatePassword(value)) 
          error = 'Password must be 8+ chars with uppercase, lowercase, number, and special character (!@#$%^&*)';
        break;
      case 'confirmPassword':
        if (!value) error = 'Please confirm your password';
        else if (value !== formData.password) error = 'Passwords do not match';
        break;
      case 'phoneNumber':
        if (!value) error = 'Phone number is required';
        else if (!validatePhoneNumber(value, formData.countryCode)) {
          const countryData = countryCodes.find(c => c.code === formData.countryCode);
          error = `Enter valid ${countryData?.length || 10}-digit phone number`;
        }
        break;
      case 'role':
        if (!value) error = 'Please select a role';
        break;
      case 'companyName':
      case 'providerName':
        if (formData.role && !value.trim()) error = 'Company name is required';
        else if (value && value.trim().length < 2) error = 'Company name must be at least 2 characters';
        break;
      case 'originLocation':
        if (formData.role === 'exporter' && !value.trim()) error = 'Origin location is required';
        else if (value && value.trim().length < 2) error = 'Location must be at least 2 characters';
        break;
      case 'destinationLocation':
        if (formData.role === 'exporter' && !value.trim()) error = 'Destination location is required';
        else if (value && value.trim().length < 2) error = 'Location must be at least 2 characters';
        break;
      case 'cargoType':
        if (formData.role === 'exporter' && !value) error = 'Cargo type is required';
        break;
      case 'operatingPorts':
        if (formData.role === 'provider' && value.length === 0) 
          error = 'Select at least one operating port';
        break;
      case 'containerTypes':
        if (formData.role === 'provider' && value.length === 0) 
          error = 'Select at least one container type';
        break;
      default:
        break;
    }

    return error;
  };

  useEffect(() => {
    const newErrors = {};
    Object.keys(touched).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
  }, [formData, touched]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'phoneNumber') {
      // Remove all non-digit characters
      const digitsOnly = value.replace(/\D/g, '');
      // Update with digits only
      setFormData(prev => ({
        ...prev,
        [name]: digitsOnly
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleCountryCodeChange = (code) => {
    setFormData(prev => ({
      ...prev,
      countryCode: code
    }));
    setShowCountryDropdown(false);
    // Re-validate phone number with new country code
    if (touched.phoneNumber) {
      const error = validateField('phoneNumber', formData.phoneNumber);
      setErrors(prev => ({ ...prev, phoneNumber: error }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setFocusedField(null);
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginBlur = (e) => {
    const { name } = e.target;
    setLoginTouched(prev => ({ ...prev, [name]: true }));
    const error = validateLoginField(name, loginData[name]);
    setLoginErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleFocus = (name) => {
    setFocusedField(name);
  };

  const handleMultiSelect = (name, value) => {
    setFormData(prev => {
      const currentValues = prev[name];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      return { ...prev, [name]: newValues };
    });
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleRouteChange = (index, field, value) => {
    const newRoutes = [...formData.routes];
    newRoutes[index][field] = value;
    setFormData(prev => ({ ...prev, routes: newRoutes }));
    setTouched(prev => ({ ...prev, routes: true }));
  };

  const addRoute = () => {
    setFormData(prev => ({
      ...prev,
      routes: [...prev.routes, { source: '', destination: '' }]
    }));
  };

  const removeRoute = (index) => {
    if (formData.routes.length > 1) {
      setFormData(prev => ({
        ...prev,
        routes: prev.routes.filter((_, i) => i !== index)
      }));
    }
  };

  const validateRoutes = () => {
    if (formData.role === 'provider') {
      // Check if all routes have both source and destination
      const allValid = formData.routes.every(route => 
        route.source.trim().length >= 2 && route.destination.trim().length >= 2
      );
      
      // Check if source and destination are different
      const noDuplicates = formData.routes.every(route => 
        route.source.trim().toLowerCase() !== route.destination.trim().toLowerCase()
      );
      
      return allValid && noDuplicates;
    }
    return true;
  };

  const getRouteError = () => {
    if (formData.role !== 'provider') return '';
    
    for (let i = 0; i < formData.routes.length; i++) {
      const route = formData.routes[i];
      if (!route.source.trim()) return `Route ${i + 1}: Source port is required`;
      if (!route.destination.trim()) return `Route ${i + 1}: Destination port is required`;
      if (route.source.trim().length < 2) return `Route ${i + 1}: Source must be at least 2 characters`;
      if (route.destination.trim().length < 2) return `Route ${i + 1}: Destination must be at least 2 characters`;
      if (route.source.trim().toLowerCase() === route.destination.trim().toLowerCase()) {
        return `Route ${i + 1}: Source and destination cannot be the same`;
      }
    }
    return '';
  };

  const isLoginValid = () => {
    return (
      validateEmail(loginData.email) &&
      validatePassword(loginData.password)
    );
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const fields = ['email', 'password'];
    const touchedMap = {};
    const errorMap = {};
    fields.forEach((field) => {
      touchedMap[field] = true;
      const error = validateLoginField(field, loginData[field]);
      if (error) errorMap[field] = error;
    });
    setLoginTouched(touchedMap);
    setLoginErrors(errorMap);

    if (Object.keys(errorMap).length > 0) {
      setLoginStatus({ type: 'error', message: 'Please fix login errors before continuing' });
      return;
    }

    setIsLoginSubmitting(true);
    setLoginStatus(null);
    try {
      // Simulate login API
      await new Promise(resolve => setTimeout(resolve, 1500));
      setLoginStatus({ type: 'success', message: 'Login successful! Redirecting...' });
      // Real app: navigate to dashboard
    } catch (err) {
      setLoginStatus({ type: 'error', message: 'Login failed. Please try again.' });
    } finally {
      setIsLoginSubmitting(false);
    }
  };

  const isFormValid = () => {
    const commonFieldsValid = 
      formData.name.trim() &&
      /^[a-zA-Z\s]+$/.test(formData.name) &&
      validateEmail(formData.email) &&
      validatePassword(formData.password) &&
      formData.password === formData.confirmPassword &&
      validatePhoneNumber(formData.phoneNumber, formData.countryCode) &&
      formData.role;

    if (!commonFieldsValid) return false;

    if (formData.role === 'exporter') {
      return (
        formData.companyName.trim() &&
        formData.originLocation.trim() &&
        formData.destinationLocation.trim() &&
        formData.cargoType
      );
    }

    if (formData.role === 'provider') {
      return (
        formData.providerName.trim() &&
        formData.operatingPorts.length > 0 &&
        validateRoutes() &&
        formData.containerTypes.length > 0
      );
    }

    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allFields = Object.keys(formData);
    const allTouched = {};
    allFields.forEach(field => { allTouched[field] = true; });
    setTouched(allTouched);

    if (!isFormValid()) {
      setSubmitStatus({ type: 'error', message: 'Please fix all errors before submitting' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success
      setSubmitStatus({ 
        type: 'success', 
        message: 'Registration successful! Redirecting to login...' 
      });
      
      // Reset form after success
      setTimeout(() => {
        // In real app: navigate to login page
        console.log('Redirect to login page');
      }, 2000);
      
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Registration failed. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-wrapper">
        {/* Left side - Branding */}
        <motion.div 
          className="brand-section"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="brand-content">
            <motion.div 
              className="logo-container"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <motion.div 
                className="logo-icon"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <svg viewBox="0 0 80 80" fill="none">
                  <motion.path 
                    d="M20 25L40 15L60 25V45L40 55L20 45V25Z" 
                    stroke="currentColor" 
                    strokeWidth="3" 
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                  <motion.path 
                    d="M40 15V35M40 35L20 45M40 35L60 45" 
                    stroke="currentColor" 
                    strokeWidth="3" 
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
                  />
                  <motion.circle 
                    cx="40" 
                    cy="65" 
                    r="3" 
                    fill="currentColor"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, type: "spring", stiffness: 200 }}
                  />
                </svg>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h2 className="brand-tagline">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  Hassle Free
                </motion.span>
                <br/>
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  Shipping & Logistics
                </motion.span>
              </h2>
              <motion.p 
                className="brand-description"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                Join exporters and logistics providers transforming international shipping with intelligent automation and real-time tracking.
              </motion.p>
            </motion.div>

            {/* Logistics Illustration - use airplane photo centered */}
            <motion.div 
              className="illustration-container"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="airplane-photo-wrapper">
                <img
                  src={clubwarBg}
                  alt="Airplane logistics illustration"
                  className="airplane-photo"
                />
              </div>
            </motion.div>

            <motion.div 
              className="features-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              {[
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* container */}
                      <rect x="3.5" y="6.5" width="17" height="11" rx="2" stroke="currentColor" strokeWidth="1.8" />
                      {/* vertical ribs */}
                      <path d="M8 7V18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      <path d="M12 7V18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      <path d="M16 7V18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      {/* motion arrow */}
                      <path d="M5 20H15.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      <path d="M13.5 17.5L16 20L13.5 22.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ),
                  title: "Easy Shipment",
                  description: "Simplified shipping process"
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* coin */}
                      <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.8" />
                      <path
                        d="M9.3 9.4C9.7 8.5 10.5 8 11.6 8c1.2 0 2.1.7 2.1 1.8 0 1.2-1 1.6-2.3 2-1.3.4-2.7.9-2.7 2.5 0 1.3 1.1 2.2 2.7 2.2 1.3 0 2.3-.6 2.7-1.7"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                      <path d="M12 6V5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      <path d="M12 19V18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      {/* price tag */}
                      <path d="M16.2 6.2L18.5 8.5L16.8 10.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ),
                  title: "Cheap Price",
                  description: "Best prices in the market"
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* shield */}
                      <path
                        d="M12 3.5L6.5 5.6V11.3C6.5 14.6 8.7 17.6 12 18.8C15.3 17.6 17.5 14.6 17.5 11.3V5.6L12 3.5Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                      {/* check */}
                      <path
                        d="M9 11.3L11 13.3L15 9.8"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* box */}
                      <rect x="4" y="18" width="4" height="3" rx="0.8" stroke="currentColor" strokeWidth="1.4" />
                      <rect x="16" y="18" width="4" height="3" rx="0.8" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  ),
                  title: "Secure Delivery",
                  description: "Safe and tracked shipments"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="feature-card"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
                  whileHover={{ 
                    x: 12,
                    transition: { type: "spring", stiffness: 400, damping: 25 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div 
                    className="feature-icon"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <div className="feature-text">
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              className="coverage-info"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <motion.p 
                className="coverage-text"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.3, type: "spring", stiffness: 200 }}
              >
                Delivering to 50+ countries worldwide
              </motion.p>
            </motion.div>
          </div>
        </motion.div>

        {/* Right side - Registration Form */}
        <motion.div 
          className="form-section"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="form-container">
            <div className="form-header">
              <h2>{showLogin ? 'Welcome back' : 'Create Account'}</h2>
              <p>
                {showLogin
                  ? 'Sign in to continue your logistics journey'
                  : 'Start your logistics journey today'}
              </p>
            </div>

            {showLogin ? (
              <form className="login-form" onSubmit={handleLoginSubmit} noValidate>
                <h3 className="login-title">Sign in</h3>
                <div className="login-grid">
                  <div className="form-group full-width">
                    <label htmlFor="loginEmail">Email *</label>
                    <input
                      id="loginEmail"
                      name="email"
                      type="email"
                      value={loginData.email}
                      onChange={handleLoginChange}
                      onBlur={handleLoginBlur}
                      className={loginErrors.email && loginTouched.email ? 'error' : ''}
                      placeholder="you@example.com"
                    />
                    {loginErrors.email && loginTouched.email && (
                      <span className="error-message">{loginErrors.email}</span>
                    )}
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="loginPassword">Password *</label>
                    <input
                      id="loginPassword"
                      name="password"
                      type="password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      onBlur={handleLoginBlur}
                      className={loginErrors.password && loginTouched.password ? 'error' : ''}
                      placeholder="••••••••"
                    />
                    {loginErrors.password && loginTouched.password && (
                      <span className="error-message">{loginErrors.password}</span>
                    )}
                  </div>
                </div>

                {loginStatus && (
                  <div className={`submit-status ${loginStatus.type}`}>
                    {loginStatus.message}
                  </div>
                )}

                <div className="login-actions">
                  <button
                    type="submit"
                    className="submit-btn login-submit"
                    disabled={!isLoginValid() || isLoginSubmitting}
                  >
                    {isLoginSubmitting ? 'Signing in...' : 'Sign in'}
                  </button>
                </div>

                <p className="login-link">
                  New here?{' '}
                  <button
                    type="button"
                    className="login-link-button"
                    onClick={() => setShowLogin(false)}
                  >
                    Create an account
                  </button>
                </p>
              </form>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* Common Fields */}
                <div className="form-grid">
                  <motion.div 
                    className="form-group full-width"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <label htmlFor="name">Full Name *</label>
                    <div className="input-wrapper">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onFocus={() => handleFocus('name')}
                        className={errors.name && touched.name ? 'error' : ''}
                        placeholder="John Doe"
                      />
                      {focusedField === 'name' && (
                        <motion.div
                          className="input-focus-ring"
                          layoutId="input-focus"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </div>
                    <AnimatePresence mode="wait">
                      {errors.name && touched.name && (
                        <motion.span
                          className="error-message"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.2 }}
                        >
                          {errors.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.email && touched.email ? 'error' : ''}
                      placeholder="john@company.com"
                    />
                    {errors.email && touched.email && (
                      <span className="error-message">{errors.email}</span>
                    )}
                  </div>

                  <motion.div 
                    className="form-group"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <label htmlFor="phoneNumber">Phone Number *</label>
                    <div className="phone-input-wrapper">
                      <div className="country-code-selector" onClick={() => setShowCountryDropdown(!showCountryDropdown)}>
                        <span className="flag">{countryCodes.find(c => c.code === formData.countryCode)?.flag}</span>
                        <span className="code">{formData.countryCode}</span>
                        <svg className="dropdown-arrow" width="12" height="8" viewBox="0 0 12 8" fill="none">
                          <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      
                      <AnimatePresence>
                        {showCountryDropdown && (
                          <>
                            <motion.div 
                              className="country-dropdown-overlay"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              onClick={() => setShowCountryDropdown(false)}
                            />
                            <motion.div
                              className="country-dropdown"
                              initial={{ opacity: 0, y: -10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -10, scale: 0.95 }}
                              transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            >
                              <div className="country-dropdown-header">
                                <span>Select Country</span>
                              </div>
                              <div className="country-dropdown-list">
                                {countryCodes.map((country) => (
                                  <motion.div
                                    key={country.code}
                                    className={`country-option ${formData.countryCode === country.code ? 'selected' : ''}`}
                                    onClick={() => handleCountryCodeChange(country.code)}
                                    whileHover={{ backgroundColor: 'rgba(255, 206, 51, 0.1)' }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <span className="country-flag">{country.flag}</span>
                                    <span className="country-name">{country.country}</span>
                                    <span className="country-code-text">{country.code}</span>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                      
                      <div className="input-wrapper phone-input">
                        <input
                          type="tel"
                          id="phoneNumber"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          onFocus={() => handleFocus('phoneNumber')}
                          className={errors.phoneNumber && touched.phoneNumber ? 'error' : ''}
                          placeholder={`${'X'.repeat(countryCodes.find(c => c.code === formData.countryCode)?.length || 10)}`}
                          maxLength={countryCodes.find(c => c.code === formData.countryCode)?.length || 10}
                        />
                        {focusedField === 'phoneNumber' && (
                          <motion.div
                            className="input-focus-ring"
                            layoutId="input-focus"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                      </div>
                    </div>
                    <AnimatePresence mode="wait">
                      {errors.phoneNumber && touched.phoneNumber && (
                        <motion.span
                          className="error-message"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.2 }}
                        >
                          {errors.phoneNumber}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <div className="form-group">
                    <label htmlFor="password">Password *</label>
                    <div className="password-input">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.password && touched.password ? 'error' : ''}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        className="toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? '👁️' : '👁️‍🗨️'}
                      </button>
                    </div>
                    {errors.password && touched.password && (
                      <span className="error-message">{errors.password}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password *</label>
                    <div className="password-input">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.confirmPassword && touched.confirmPassword ? 'error' : ''}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        className="toggle-password"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        aria-label="Toggle password visibility"
                      >
                        {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                      </button>
                    </div>
                    {errors.confirmPassword && touched.confirmPassword && (
                      <span className="error-message">{errors.confirmPassword}</span>
                    )}
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="role">I am a *</label>
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.role && touched.role ? 'error' : ''}
                    >
                      <option value="">Select your role</option>
                      <option value="exporter">Exporter</option>
                      <option value="provider">Logistics Provider</option>
                    </select>
                    {errors.role && touched.role && (
                      <span className="error-message">{errors.role}</span>
                    )}
                  </div>
                </div>

                {/* Role-Specific Fields */}
                <AnimatePresence mode="wait">
                  {formData.role === 'exporter' && (
                    <motion.div
                      key="exporter"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="role-specific-section"
                    >
                      <div className="section-header">
                        <h3>Exporter Information</h3>
                      </div>
                      <div className="form-grid">
                        <div className="form-group full-width">
                          <label htmlFor="companyName">Company Name *</label>
                          <input
                            type="text"
                            id="companyName"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.companyName && touched.companyName ? 'error' : ''}
                            placeholder="Your Company Ltd."
                          />
                          {errors.companyName && touched.companyName && (
                            <span className="error-message">{errors.companyName}</span>
                          )}
                        </div>

                        <div className="form-group">
                          <label htmlFor="originLocation">Origin Location *</label>
                          <input
                            type="text"
                            id="originLocation"
                            name="originLocation"
                            value={formData.originLocation}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.originLocation && touched.originLocation ? 'error' : ''}
                            placeholder="Shanghai, China"
                          />
                          {errors.originLocation && touched.originLocation && (
                            <span className="error-message">{errors.originLocation}</span>
                          )}
                        </div>

                        <div className="form-group">
                          <label htmlFor="destinationLocation">Destination Location *</label>
                          <input
                            type="text"
                            id="destinationLocation"
                            name="destinationLocation"
                            value={formData.destinationLocation}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.destinationLocation && touched.destinationLocation ? 'error' : ''}
                            placeholder="Los Angeles, USA"
                          />
                          {errors.destinationLocation && touched.destinationLocation && (
                            <span className="error-message">{errors.destinationLocation}</span>
                          )}
                        </div>

                        <div className="form-group full-width">
                          <label htmlFor="cargoType">Primary Cargo Type *</label>
                          <select
                            id="cargoType"
                            name="cargoType"
                            value={formData.cargoType}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.cargoType && touched.cargoType ? 'error' : ''}
                          >
                            <option value="">Select cargo type</option>
                            {cargoTypes.map(type => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                          {errors.cargoType && touched.cargoType && (
                            <span className="error-message">{errors.cargoType}</span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {formData.role === 'provider' && (
                    <motion.div
                      key="provider"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="role-specific-section"
                    >
                      <div className="section-header">
                        <h3>Logistics Provider Information</h3>
                      </div>
                      <div className="form-grid">
                        <div className="form-group full-width">
                          <label htmlFor="providerName">Company Name *</label>
                          <input
                            type="text"
                            id="providerName"
                            name="providerName"
                            value={formData.providerName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.providerName && touched.providerName ? 'error' : ''}
                            placeholder="Your Logistics Company"
                          />
                          {errors.providerName && touched.providerName && (
                            <span className="error-message">{errors.providerName}</span>
                          )}
                        </div>

                        <div className="form-group full-width">
                          <label>Operating Ports * (Select multiple)</label>
                          <div className="multi-select-container">
                            {portsList.map(port => (
                              <button
                                key={port}
                                type="button"
                                className={`multi-select-item ${formData.operatingPorts.includes(port) ? 'selected' : ''}`}
                                onClick={() => handleMultiSelect('operatingPorts', port)}
                              >
                                {port}
                                {formData.operatingPorts.includes(port) && <span className="check">✓</span>}
                              </button>
                            ))}
                          </div>
                          {errors.operatingPorts && touched.operatingPorts && (
                            <span className="error-message">{errors.operatingPorts}</span>
                          )}
                        </div>

                        <div className="form-group full-width">
                          <label>Routes * (Source → Destination)</label>
                          <div className="routes-container">
                            {formData.routes.map((route, index) => (
                              <motion.div 
                                key={index} 
                                className="route-item"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                              >
                                <input
                                  type="text"
                                  value={route.source}
                                  onChange={(e) => handleRouteChange(index, 'source', e.target.value)}
                                  placeholder="Source Port (e.g., Mumbai)"
                                  className="route-input"
                                />
                                <span className="route-arrow">→</span>
                                <input
                                  type="text"
                                  value={route.destination}
                                  onChange={(e) => handleRouteChange(index, 'destination', e.target.value)}
                                  placeholder="Destination Port (e.g., Singapore)"
                                  className="route-input"
                                />
                                {formData.routes.length > 1 && (
                                  <motion.button
                                    type="button"
                                    className="remove-route"
                                    onClick={() => removeRoute(index)}
                                    aria-label="Remove route"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                  >
                                    ✕
                                  </motion.button>
                                )}
                              </motion.div>
                            ))}
                            <motion.button 
                              type="button" 
                              className="add-route-btn" 
                              onClick={addRoute}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              + Add Another Route
                            </motion.button>
                          </div>
                          <AnimatePresence mode="wait">
                            {getRouteError() && touched.routes && (
                              <motion.span
                                className="error-message"
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                transition={{ duration: 0.2 }}
                              >
                                {getRouteError()}
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </div>

                        <div className="form-group full-width">
                          <label>Container Types * (Select multiple)</label>
                          <div className="multi-select-container">
                            {containerTypesList.map(type => (
                              <button
                                key={type}
                                type="button"
                                className={`multi-select-item ${formData.containerTypes.includes(type) ? 'selected' : ''}`}
                                onClick={() => handleMultiSelect('containerTypes', type)}
                              >
                                {type}
                                {formData.containerTypes.includes(type) && <span className="check">✓</span>}
                              </button>
                            ))}
                          </div>
                          {errors.containerTypes && touched.containerTypes && (
                            <span className="error-message">{errors.containerTypes}</span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <div className="form-footer">
                  <AnimatePresence>
                    {submitStatus && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`submit-status ${submitStatus.type}`}
                      >
                        {submitStatus.message}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={!isFormValid() || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner"></span>
                        Creating Account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </button>

                  <p className="login-link">
                    Already have an account?{' '}
                    <button
                      type="button"
                      className="login-link-button"
                      onClick={() => setShowLogin(true)}
                    >
                      Sign in
                    </button>
                  </p>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .registration-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0F1419 0%, #131721 100%);
          font-family: 'Neue Machina', 'Neue Montreal', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }

        .registration-container::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -20%;
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(255, 206, 51, 0.12) 0%, transparent 70%);
          border-radius: 50%;
          animation: float 20s ease-in-out infinite;
          filter: blur(60px);
        }

        .registration-container::after {
          content: '';
          position: absolute;
          bottom: -30%;
          left: -10%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(255, 206, 51, 0.08) 0%, transparent 70%);
          border-radius: 50%;
          animation: float 15s ease-in-out infinite reverse;
          filter: blur(60px);
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }

        .registration-wrapper {
          max-width: 1400px;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 0;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          border-radius: 32px;
          overflow: hidden;
          box-shadow: 
            0 25px 80px rgba(0, 0, 0, 0.25),
            0 0 0 1px rgba(255, 206, 51, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease;
        }

        .registration-wrapper:hover {
          transform: translateY(-2px);
        }

        /* Brand Section */
        .brand-section {
          background: #FFCE33;
          padding: 4rem 3rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .brand-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='none'/%3E%3Cpath d='M30 0L60 30L30 60L0 30z' fill='%23131721' fill-opacity='0.02'/%3E%3C/svg%3E");
          background-size: 60px 60px;
        }

        .brand-content {
          position: relative;
          z-index: 1;
        }

        .logo-container {
          margin-bottom: 3rem;
        }

        .logo-icon {
          width: 80px;
          height: 80px;
          color: #131721;
          margin-bottom: 1.5rem;
        }

        .brand-name {
          font-size: 3rem;
          font-weight: 800;
          color: #131721;
          letter-spacing: -0.02em;
          margin-bottom: 0.5rem;
          font-family: 'Neue Machina', 'Outfit', sans-serif;
        }

        .brand-tagline {
          font-size: 2.2rem;
          font-weight: 800;
          color: #131721;
          line-height: 1.15;
          margin-bottom: 1.5rem;
          font-family: 'Neue Machina', 'Outfit', sans-serif;
          letter-spacing: -0.01em;
        }

        .brand-description {
          font-size: 1.0625rem;
          color: #131721;
          opacity: 0.85;
          line-height: 1.6;
          margin-bottom: 2.5rem;
          max-width: 480px;
        }

        .illustration-container {
          margin: 2rem 0;
          padding: 1.5rem;
          background: rgba(19, 23, 33, 0.02);
          border-radius: 16px;
          overflow: hidden;
        }

        .airplane-photo-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.35);
          /* vertical space so the plane fills the box */
          min-height: 190px;
        }

        .airplane-photo {
          width: 120%;
          height: auto;
          object-fit: cover;
          /* zoom and shift so airplane spans the full box */
          transform: scale(1.4) translateX(-12%);
          transform-origin: center;
          border-radius: 0;
        }

        .features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          margin-top: 2rem;
        }

        .feature-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem 1.5rem;
          background: rgba(19, 23, 33, 0.04);
          border-radius: 16px;
          border: 2px solid transparent;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255, 206, 51, 0) 0%, rgba(255, 206, 51, 0.05) 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .feature-card:hover::before {
          opacity: 1;
        }

        .feature-card:hover {
          background: #131721;
          border-color: rgba(255, 206, 51, 0.3);
          transform: translateX(12px) scale(1.02);
          box-shadow: 
            0 8px 24px rgba(19, 23, 33, 0.2),
            0 0 0 1px rgba(255, 206, 51, 0.2);
        }

        .feature-icon {
          width: 40px;
          height: 40px;
          color: #131721;
          flex-shrink: 0;
          transition: all 0.3s;
        }

        .feature-icon svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        .feature-card:hover .feature-icon {
          color: #FFCE33;
          transform: scale(1.1);
        }

        .feature-text h4 {
          font-size: 1rem;
          font-weight: 700;
          color: #131721;
          margin-bottom: 0.25rem;
          transition: color 0.3s;
          font-family: 'Neue Machina', 'Outfit', sans-serif;
        }

        .feature-card:hover .feature-text h4 {
          color: #FFFFFF;
        }

        .feature-text p {
          font-size: 0.875rem;
          color: rgba(19, 23, 33, 0.7);
          margin: 0;
          transition: color 0.3s;
        }

        .feature-card:hover .feature-text p {
          color: rgba(255, 255, 255, 0.8);
        }

        .coverage-info {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 2px solid rgba(19, 23, 33, 0.1);
          text-align: center;
        }

        .coverage-text {
          font-size: 0.9375rem;
          font-weight: 600;
          color: #131721;
          opacity: 0.85;
        }

        /* Form Section */
        .form-section {
          padding: 3rem;
          background: #FFFFFF;
          overflow-y: auto;
          max-height: 95vh;
        }

        .form-container {
          max-width: 600px;
          margin: 0 auto;
        }

        .form-header {
          margin-bottom: 2.5rem;
        }

        .form-header h2 {
          font-size: 2rem;
          font-weight: 800;
          color: #131721;
          margin-bottom: 0.5rem;
          font-family: 'Neue Machina', 'Outfit', sans-serif;
        }

        .form-header p {
          color: #6B7280;
          font-size: 1rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        label {
          font-size: 0.875rem;
          font-weight: 600;
          color: #131721;
          margin-bottom: 0.5rem;
          display: block;
          transition: color 0.2s ease;
        }

        .phone-input-wrapper {
          display: flex;
          gap: 0.75rem;
          align-items: stretch;
          position: relative;
        }

        .country-code-selector {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 1rem;
          border: 2px solid #E5E7EB;
          border-radius: 14px;
          background: #FFFFFF;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          min-width: 110px;
          min-height: 52px;
          justify-content: space-between;
          position: relative;
          z-index: 10;
        }

        .country-code-selector:hover {
          border-color: #FFCE33;
          background: #FFFBF0;
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(255, 206, 51, 0.12);
        }

        .country-code-selector .flag {
          font-size: 1.25rem;
          line-height: 1;
        }

        .country-code-selector .code {
          font-weight: 600;
          color: #131721;
          font-size: 0.9375rem;
        }

        .dropdown-arrow {
          color: #6B7280;
          transition: transform 0.3s ease;
        }

        .country-code-selector:hover .dropdown-arrow {
          color: #FFCE33;
        }

        .country-dropdown-overlay {
          position: fixed;
          inset: 0;
          z-index: 100;
        }

        .country-dropdown {
          position: absolute;
          top: calc(100% + 0.5rem);
          left: 0;
          width: 320px;
          max-height: 400px;
          background: #FFFFFF;
          border-radius: 16px;
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.15),
            0 0 0 1px rgba(0, 0, 0, 0.05);
          overflow: hidden;
          z-index: 101;
        }

        .country-dropdown-header {
          padding: 1rem 1.25rem;
          border-bottom: 1px solid #E5E7EB;
          font-weight: 600;
          color: #131721;
          font-size: 0.875rem;
          background: linear-gradient(135deg, rgba(255, 206, 51, 0.05) 0%, transparent 100%);
        }

        .country-dropdown-list {
          max-height: 340px;
          overflow-y: auto;
          padding: 0.5rem;
        }

        .country-dropdown-list::-webkit-scrollbar {
          width: 6px;
        }

        .country-dropdown-list::-webkit-scrollbar-track {
          background: #F3F4F6;
          border-radius: 3px;
        }

        .country-dropdown-list::-webkit-scrollbar-thumb {
          background: #FFCE33;
          border-radius: 3px;
        }

        .country-dropdown-list::-webkit-scrollbar-thumb:hover {
          background: #FFD96B;
        }

        .country-option {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .country-option:hover {
          background: rgba(255, 206, 51, 0.1);
        }

        .country-option.selected {
          background: linear-gradient(135deg, #FFCE33 0%, #FFD96B 100%);
          font-weight: 600;
        }

        .country-flag {
          font-size: 1.5rem;
          line-height: 1;
          flex-shrink: 0;
        }

        .country-name {
          flex: 1;
          font-size: 0.875rem;
          color: #131721;
        }

        .country-option.selected .country-name {
          color: #131721;
        }

        .country-code-text {
          font-size: 0.875rem;
          color: #6B7280;
          font-weight: 600;
        }

        .country-option.selected .country-code-text {
          color: #131721;
        }

        .phone-input {
          flex: 1;
        }

        .phone-input input {
          width: 100%;
        }

        .input-wrapper {
          position: relative;
        }

        .input-focus-ring {
          position: absolute;
          inset: -2px;
          border-radius: 14px;
          border: 2px solid #FFCE33;
          pointer-events: none;
          z-index: 1;
        }

        input, select {
          width: 100%;
          padding: 1rem 1.125rem;
          border: 2px solid #E5E7EB;
          border-radius: 14px;
          font-size: 1rem;
          font-family: inherit;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: #FFFFFF;
          color: #131721;
          position: relative;
        }

        input:hover:not(:focus), select:hover:not(:focus) {
          border-color: #D1D5DB;
          background: #FAFAFA;
        }

        input:focus, select:focus {
          outline: none;
          border-color: #FFCE33;
          background: #FFFBF0;
          box-shadow: 
            0 0 0 4px rgba(255, 206, 51, 0.08),
            0 2px 8px rgba(255, 206, 51, 0.12);
          transform: translateY(-1px);
        }

        input.error, select.error {
          border-color: #EF4444;
        }

        input::placeholder {
          color: #9CA3AF;
        }

        .password-input {
          position: relative;
        }

        .toggle-password {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.25rem;
          padding: 0.25rem;
          display: flex;
          align-items: center;
          opacity: 0.5;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 6px;
        }

        .toggle-password:hover {
          opacity: 1;
          background: rgba(255, 206, 51, 0.1);
          transform: translateY(-50%) scale(1.1);
        }

        .toggle-password:active {
          transform: translateY(-50%) scale(0.95);
        }

        .error-message {
          color: #EF4444;
          font-size: 0.75rem;
          margin-top: 0.375rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .error-message::before {
          content: '⚠';
          font-size: 0.875rem;
        }

        .role-specific-section {
          background: linear-gradient(135deg, rgba(249, 250, 251, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%);
          backdrop-filter: blur(10px);
          padding: 2rem;
          border-radius: 20px;
          margin-bottom: 1.5rem;
          border: 1px solid rgba(255, 206, 51, 0.1);
          box-shadow: 
            0 4px 16px rgba(0, 0, 0, 0.04),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
        }

        .section-header {
          margin-bottom: 1.5rem;
        }

        .section-header h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #131721;
          font-family: 'Neue Machina', 'Outfit', sans-serif;
        }

        .multi-select-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }

        .multi-select-item {
          padding: 0.625rem 1.125rem;
          border: 2px solid #E5E7EB;
          border-radius: 10px;
          background: #FFFFFF;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 500;
          color: #4B5563;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: inherit;
          position: relative;
        }

        .multi-select-item::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 10px;
          background: linear-gradient(135deg, rgba(255, 206, 51, 0) 0%, rgba(255, 206, 51, 0.1) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .multi-select-item:hover {
          border-color: #FFCE33;
          background: #FFFBF0;
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 4px 12px rgba(255, 206, 51, 0.2);
        }

        .multi-select-item:hover::before {
          opacity: 1;
        }

        .multi-select-item.selected {
          border-color: #FFCE33;
          background: linear-gradient(135deg, #FFCE33 0%, #FFD96B 100%);
          color: #131721;
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(255, 206, 51, 0.3);
        }

        .multi-select-item.selected:hover {
          background: linear-gradient(135deg, #FFD96B 0%, #FFE8A3 100%);
          border-color: #FFD96B;
          box-shadow: 0 6px 16px rgba(255, 206, 51, 0.4);
        }

        .multi-select-item .check {
          font-size: 0.75rem;
        }

        .routes-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .route-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .route-input {
          flex: 1;
          padding: 0.75rem;
          border: 2px solid #E5E7EB;
          border-radius: 8px;
          font-size: 0.875rem;
        }

        .route-arrow {
          font-size: 1.5rem;
          color: #FFCE33;
          font-weight: bold;
        }

        .remove-route {
          padding: 0.5rem;
          background: #FEE2E2;
          border: none;
          border-radius: 8px;
          color: #EF4444;
          cursor: pointer;
          font-size: 1rem;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .remove-route:hover {
          background: #EF4444;
          color: #FFFFFF;
          transform: scale(1.1);
        }

        .add-route-btn {
          padding: 0.75rem 1.5rem;
          background: #FFFFFF;
          border: 2px dashed #D1D5DB;
          border-radius: 8px;
          color: #6B7280;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 600;
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .add-route-btn:hover {
          border-color: #FFCE33;
          color: #131721;
          background: #FFFBF0;
          border-style: solid;
          transform: translateY(-2px);
        }

        .form-footer {
          margin-top: 2rem;
        }

        .submit-status {
          padding: 1rem;
          border-radius: 12px;
          margin-bottom: 1rem;
          font-size: 0.875rem;
          font-weight: 600;
          text-align: center;
        }

        .submit-status.success {
          background: #D1FAE5;
          color: #065F46;
          border: 2px solid #10B981;
        }

        .submit-status.error {
          background: #FEE2E2;
          color: #991B1B;
          border: 2px solid #EF4444;
        }

        .submit-btn {
          width: 100%;
          padding: 1.125rem 2rem;
          background: linear-gradient(135deg, #FFCE33 0%, #FFD96B 100%);
          border: none;
          border-radius: 14px;
          color: #131721;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          font-family: inherit;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          box-shadow: 
            0 4px 14px rgba(255, 206, 51, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.5);
          position: relative;
          overflow: hidden;
        }

        .submit-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 100%);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }

        .submit-btn:hover::before {
          transform: translateX(100%);
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-3px) scale(1.01);
          box-shadow: 
            0 12px 28px rgba(255, 206, 51, 0.4),
            0 0 0 1px rgba(255, 206, 51, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.6);
          background: linear-gradient(135deg, #FFD96B 0%, #FFE8A3 100%);
        }

        .submit-btn:active:not(:disabled) {
          transform: translateY(-1px) scale(0.99);
          transition: all 0.1s ease;
        }

        .submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
          box-shadow: 0 2px 8px rgba(255, 206, 51, 0.2);
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(19, 23, 33, 0.2);
          border-top-color: #131721;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .login-link {
          text-align: center;
          margin-top: 1.5rem;
          color: #6B7280;
          font-size: 0.875rem;
        }

        .login-link-button {
          color: #FFCE33;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.2s ease;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          background: transparent;
          border: none;
          cursor: pointer;
        }

        .login-link-button:hover {
          color: #131721;
          background: #FFFBF0;
          text-decoration: none;
        }

        .login-form {
          margin-top: 1.75rem;
          padding-top: 1.5rem;
          border-top: 1px dashed #E5E7EB;
        }

        .login-title {
          font-size: 1.125rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: #111827;
        }

        .login-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }

        .login-actions {
          margin-top: 1.25rem;
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .login-submit {
          flex: 1;
        }

        .login-cancel {
          padding: 0.9rem 1.5rem;
          border-radius: 12px;
          border: 2px solid #E5E7EB;
          background: #FFFFFF;
          color: #4B5563;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .login-cancel:hover {
          border-color: #D1D5DB;
          background: #F9FAFB;
          color: #111827;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .registration-wrapper {
            grid-template-columns: 1fr;
          }

          .brand-section {
            padding: 2.5rem 2rem;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .registration-container {
            padding: 1rem;
          }

          .form-section {
            padding: 1.75rem 1.25rem;
            max-height: none;
            overflow-y: visible;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .brand-tagline {
            font-size: 1.75rem;
          }

          .features-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .login-grid {
            grid-template-columns: 1fr;
          }

          .phone-input-wrapper {
            flex-direction: column;
          }

          .country-code-selector {
            width: 100%;
            min-width: 0;
          }

          .submit-btn {
            padding: 1rem 1.25rem;
          }

          .route-item {
            flex-direction: column;
            align-items: stretch;
          }

          .route-arrow {
            transform: rotate(90deg);
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default RegistrationPage;
