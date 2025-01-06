'use client';

import Select, { MultiValue } from "react-select";
import React, { useEffect, useState } from 'react';
import useModalStore from '@/app/store/modelStore';
import { IoEyeOffOutline } from 'react-icons/io5';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { UserFormData, Language, SupplierDetails, Title, Option } from '@/app/types/user';
import { addUser } from '@/app/services/user/registerUser';
import { CldUploadWidget } from 'next-cloudinary';
import { useRouter } from 'next/navigation';


const Register: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const router = useRouter();
    const [profileImage, setProfileImage] = useState(null);
    const [showconfirmPassword, setshowconfirmPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const closeModal = useModalStore((state) => state.closeModal);
    const [showPassword, setshowPassword] = useState(false);
    const [isSupplier, setIsSupplier] = useState(false);
    const [selectedLanguages, setSelectedLanguages] = useState<MultiValue<Option>>([]);
    const [selectedTitles, setSelectedTitles] = useState<MultiValue<Option>>([]);
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState<UserFormData>({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        titles: [],
        phone: '',

        description: '',
        languages: [Language.Hebrew],
        address: {
            zipCode: '',
            city: '',
            street: '',
            building: 0,
        },
        supplierDetails: { startingPrice: 0, topPrice: 0 },
        profileImage: profileImage
    });


    const language: Option[] = [
        { value: Language.English, label: "English" },
        { value: Language.French, label: "Français" },
        { value: Language.Hebrew, label: "עברית" },
        { value: Language.Russian, label: "русский" },
        { value: Language.Spanish, label: "Español" },
        { value: Language.Yiddish, label: "יידיש" },

    ];

    const allowedLanguages = Object.values(Language);
    const userLanguages = formData.languages.filter(lang => allowedLanguages.includes(lang));
    formData.languages = userLanguages;
    console.log("userLanguages",userLanguages);
    
    const titleOptions: Option[] = Object.keys(Title).map(key => ({
        value: Title[key as keyof typeof Title],
        label: Title[key as keyof typeof Title],
    }));
    titleOptions.push({
        value: 'consumer',
        label: 'צרכן',
    });
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log(formData);

        e.preventDefault();
        setIsSubmitting(true);
        // בדיקה אם התמונה לא הועלתה
        if (!profileImage) {
            setError('יש להעלות תמונה לפני ההרשמה.');
            setIsSubmitting(false);
            return;
        }
        if (formData.password != confirmPassword) {
            setError('הסיסמאות אינן תואמות');
            console.error(error);
            setIsSubmitting(false);
            return;
        }

        setError('');

        try {
            console.log("user", formData);
            console.log('Sending request...');
            const result = await addUser(formData);
            console.log(result);

            router.push('/pages/user-account');
            closeModal();
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
            console.error('Registration error:', errorMessage);
            setError(errorMessage);
        }
        finally {
            setIsSubmitting(false);
        }
    };

    const handleUploadSuccess = async (result: any) => {
        if (result.info && result.info.secure_url) {
            setProfileImage(result.info.secure_url);
        }
    };
    const mySetSelectedLanguages = (selectedOptions: MultiValue<Option>) => {
        setSelectedLanguages(selectedOptions);
      
        const languagesArray = selectedOptions.map((option) => option.value as Language);
        console.log(languagesArray);

        setFormData((prevFormData) => ({
            ...prevFormData,
            languages: languagesArray,
        }));
    }

    const handleNextStep = () => {
        setCurrentStep(prevStep => prevStep + 1);
    };

    const handleBackStep = () => {
        setCurrentStep(prevStep => prevStep - 1);
    };

    const mySetSelectedTitles = (selectedOptions: MultiValue<Option>) => {
        setSelectedTitles(selectedOptions);
        const titleArray = selectedOptions.map(option => option.value as Title);
        setIsSupplier(titleArray.includes(Title.Supplier)); 
        setFormData(prevFormData => ({
            ...prevFormData,
            titles: titleArray,
        }));
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData((prevState) => {
                const parentValue = prevState[parent as keyof UserFormData];

                if (typeof parentValue === 'object' && parentValue !== null) {
                    return {
                        ...prevState,
                        [parent]: {
                            ...parentValue,
                            [child]: value
                        },
                    };
                } else {
                    console.error(`Expected ${parent} to be an object, but got:`, parentValue);
                    return prevState;
                }
            });
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            profileImage,
        }));
    }, [profileImage]);

    return (
        <div className="text-center mx-auto mb-10 max-h-[80vh] p-6">
        <h2 className="text-[#1230AE] text-2xl font-bold text-center mb-6">צור חשבון חדש</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
     
            {currentStep === 1 && (
                <>
                    <div className="border p-2 rounded bg-[#FFF7F7]">
                        <label htmlFor="firstName" className="block font-medium text-[#1230AE]">שם פרטי</label>
                        <input id="firstName" name="firstName" type="text" value={formData.firstName} onChange={handleInputChange} required className="w-full px-3 py-2 border rounded-md" />
                    </div>
                    <div className="border p-2 rounded bg-[#FFF7F7]">
                        <label htmlFor="lastName" className="block font-medium text-[#1230AE]">שם משפחה</label>
                        <input id="lastName" name="lastName" type="text" value={formData.lastName} onChange={handleInputChange} required className="w-full px-3 py-2 border rounded-md" />
                    </div>
                    <div className="border p-2 rounded bg-[#FFF7F7]">
                        <label htmlFor="userName" className="block font-medium text-[#1230AE]">שם משתמש</label>
                        <input id="userName" name="userName" type="text" value={formData.userName} onChange={handleInputChange} required className="w-full px-3 py-2 border rounded-md" />
                    </div>
                    <div className="border p-2 rounded bg-[#FFF7F7]">
                        <label htmlFor="email" className="block font-medium text-[#1230AE]">אימייל</label>
                        <input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required className="w-full px-3 py-2 border rounded-md" />
                    </div>
                    <div className="relative border p-2 rounded bg-[#FFF7F7]">
                        <label htmlFor="password" className="block font-medium text-[#1230AE]">סיסמה</label>
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            minLength={6}
                            className="w-full px-3 py-2 border rounded-md"
                            onPaste={(e) => e.preventDefault()}
                            onCopy={(e) => e.preventDefault()}
                            onCut={(e) => e.preventDefault()}
                        />
                        <button
                            type="button"
                            onClick={() => { setshowPassword(!showPassword) }}
                            className="absolute top-2/3 left-3 -translate-y-1/2 flex items-center text-[#6C48C5]">
                            {showPassword ? <IoEyeOffOutline /> : <MdOutlineRemoveRedEye />}
                        </button>
                    </div>
                    <div className="relative border p-2 rounded bg-[#FFF7F7]">
                        <label htmlFor="confirmPassword" className="block font-medium text-[#1230AE]">אשר סיסמה</label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showconfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded-md"
                            onPaste={(e) => e.preventDefault()}
                            onCopy={(e) => e.preventDefault()}
                            onCut={(e) => e.preventDefault()}
                        />
                        <button
                            type="button"
                            onClick={() => { setshowconfirmPassword(!showconfirmPassword) }}
                            className="absolute top-2/3 left-3 -translate-y-1/2 flex items-center text-[#6C48C5]">
                            {showPassword ? <IoEyeOffOutline /> : <MdOutlineRemoveRedEye />}
                        </button>
                    </div>
                </>
            )}
    
       
            {currentStep === 2 && (
                <>
                    <h5 className="text-l font-bold mt-4 text-[#1230AE]">כתובת</h5>
                    <div className="border p-2 rounded bg-[#FFF7F7]">
                        <label htmlFor="zipCode" className="block font-medium text-[#1230AE]">מיקוד</label>
                        <input
                            id="zipCode"
                            name="address.zipCode"
                            type="text"
                            value={formData.address.zipCode || ''}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <div className="border p-2 rounded bg-[#FFF7F7]">
                        <label htmlFor="city" className="block font-medium text-[#1230AE]">עיר</label>
                        <input
                            id="city"
                            name="address.city"
                            type="text"
                            value={formData.address.city || ''}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <div className="border p-2 rounded bg-[#FFF7F7]">
                        <label htmlFor="street" className="block font-medium text-[#1230AE]">רחוב</label>
                        <input
                            id="street"
                            name="address.street"
                            type="text"
                            value={formData.address.street || ''}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <div className="border p-2 rounded bg-[#FFF7F7]">
                        <label htmlFor="building" className="block font-medium text-[#1230AE]">מספר בית</label>
                        <input
                            id="building"
                            name="address.building"
                            type="text"
                            value={formData.address.building || ''}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                </>
            )}
    
         
            {currentStep === 3 && (
                <>
                    <div className="border p-2 rounded bg-[#FFF7F7]">
                        <label htmlFor="phone" className="block font-medium text-[#1230AE]">טלפון</label>
                        <input
                            id="phone"
                            name="phone"
                            type="text"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <div className="border p-2 rounded bg-[#FFF7F7]">
                        <label htmlFor="description" className="block font-medium text-[#1230AE]">כמה מילים עלי</label>
                        <input
                            id="description"
                            name="description"
                            type="text"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <div className="border p-2 rounded bg-[#FFF7F7]">
                        <label className="text-[#1230AE]">בחר סוג משתמש:</label>
                        <Select
                            options={titleOptions}
                            isMulti
                            placeholder="בחר טיטל"
                            onChange={mySetSelectedTitles}
                            value={selectedTitles}
                        />
                    </div>
                    <div className="border p-2 rounded bg-[#FFF7F7]">
                        <label className="text-[#1230AE]">השפות שלי:</label>
                        <Select
                            options={language}
                            isMulti
                            placeholder="בחר שפות..."
                            onChange={mySetSelectedLanguages}
                            value={selectedLanguages}
                        />
                    </div>
                    {isSupplier && (
                        <>
                            <div className="border p-2 rounded bg-[#FFF7F7]">
                                <label htmlFor="minPrice" className="block font-medium text-[#1230AE]">מחיר מינימלי</label>
                                <input
                                    id="minPrice"
                                    name="supplierDetails.minPrice"
                                    type="number"
                                    value={formData.supplierDetails?.startingPrice}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                            </div>
                            <div className="border p-2 rounded bg-[#FFF7F7]">
                                <label htmlFor="maxPrice" className="block font-medium text-[#1230AE]">מחיר מקסימלי</label>
                                <input
                                    id="maxPrice"
                                    name="supplierDetails.maxPrice"
                                    type="number"
                                    value={formData.supplierDetails?.topPrice}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                            </div>
                        </>
                    )}
                </>
            )}
    
            {/* שלב של תמונת פרופיל */}
            {currentStep === 4 && (
                <>
                    <div className="border p-2 rounded bg-[#FFF7F7]">
                        <label className="text-[#1230AE]">העלאת תמונת פרופיל</label>
                        <CldUploadWidget
                            uploadPreset="appOrganizerEvent"
                            onSuccess={handleUploadSuccess}
                            options={{
                                sources: [
                                    'local',
                                    'camera',
                                    'google_drive',
                                    'url'
                                ],
                                maxFiles: 35,
                            }}
                        >
                            {({ open }) => (
                                <button
                                    onClick={() => open()}
                                    className="bg-[#6C48C5] hover:bg-[#C68FE6] text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#1230AE] focus:ring-opacity-50"
                                >
                                    Upload an Image
                                </button>
                            )}
                        </CldUploadWidget>
                    </div>
                </>
            )}
    
            <div className="flex justify-between mt-6">
                {currentStep > 1 && (
                    <button type="button" onClick={handleBackStep} className="bg-[#6C48C5] text-white py-2 px-4 rounded-md">הקודם</button>
                )}
                {currentStep < 4 ? (
                    <button type="button" onClick={handleNextStep} className="bg-[#1230AE] text-white py-2 px-4 rounded-md">הבא</button>
                ) : (
                    <button type="submit" className={`${!isSubmitting ? 'bg-[#1230AE]' : 'bg-gray-400'} text-white py-2 px-4 rounded-md`} disabled={isSubmitting}>
                        {isSubmitting ? 'אנא המתן...' : 'שלח'}
                    </button>
                )}
            </div>
        </form>
    </div>
    
    );
};
export default Register;
