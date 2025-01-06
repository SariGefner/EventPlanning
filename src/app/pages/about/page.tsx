import React from 'react';
import { Circle } from 'lucide-react';

const AboutPage = () => {
    return (
        <div className="relative min-h-screen bg-[#FFF7F7]">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#C68FE6] opacity-20 blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-[#6C48C5] opacity-20 blur-xl"></div>
            
            <div className="container mx-auto py-12 px-4 text-center max-w-4xl relative">
                {/* Title section with decorative elements */}
                <div className="relative mb-12">
                    <h1 className="text-5xl font-bold text-[#1230AE] mb-2">אודות האתר</h1>
                    <div className="w-24 h-1 bg-[#6C48C5] mx-auto rounded-full"></div>
                </div>
                
                <div className="space-y-10 text-right">
                    {/* Main subtitle with gradient background */}
                    <div className="bg-gradient-to-r from-[#1230AE]/10 to-[#6C48C5]/10 p-8 rounded-2xl">
                        <h2 className="text-3xl font-semibold text-[#1230AE] mb-4">
                            Event Planning: הרשת החברתית שלך לעולם האירועים
                        </h2>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            חלמת על אירוע מושלם? ב-Event Planning תוכלי למצוא השראה אינסופית, לחלוק את הרגעים המיוחדים שלך עם חברים ולהיות חלק מקהילה תוססת של חובבי אירועים.
                        </p>
                    </div>

                    {/* Features section with custom cards */}
                    <div className="bg-white rounded-3xl shadow-lg p-8 border border-[#C68FE6]/20">
                        <h3 className="text-2xl font-semibold text-[#6C48C5] mb-6">
                            מה הופך את Event Planning למיוחד?
                        </h3>
                        <div className="grid gap-6">
                            {[
                                { title: "גלילה אינסופית של השראה", content: "דפדפי בין אלפי תמונות וסרטונים מאירועים מכל הסוגים, מקבלות השראה לרעיונות חדשים ומגלים את הטרנדים האחרונים." },
                                { title: "קהילה תומכת", content: "הצטרפי לקבוצות לפי נושאים, שתפי את התמונות והסרטונים שלך, וקראי את ההערות והתגובות של חברים אחרים." },
                                { title: "חיפוש מתקדם", content: "מצאי את האירועים שמעניינים אותך לפי מיקום, תאריך, נושא וסגנון." },
                                { title: "כלי ניהול אירועים", content: "תכנני את האירוע שלך בקלות, תוך שימוש בכלים מתקדמים לניהול רשימת האורחים, התקציב והלו\"ז." },
                                { title: "ספקים מומלצים", content: "גלי את הספקים הטובים ביותר באזור שלך, קראי ביקורות והשווי הצעות." }
                            ].map((item, index) => (
                                <div key={index} className="p-4 rounded-xl bg-gradient-to-r from-[#FFF7F7] to-white border-r-4 border-[#6C48C5]">
                                    <h4 className="font-bold text-[#1230AE] mb-2">{item.title}</h4>
                                    <p className="text-gray-700">{item.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Why section with floating elements */}
                    <div className="relative bg-gradient-to-br from-[#1230AE]/5 to-[#C68FE6]/5 rounded-3xl p-8">
                        <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-[#C68FE6]/20"></div>
                        <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-[#6C48C5]/20"></div>
                        
                        <h3 className="text-2xl font-semibold text-[#1230AE] mb-6">
                            למה Event Planning?
                        </h3>
                        <div className="space-y-6 relative z-10">
                            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
                                <h4 className="font-bold text-[#6C48C5] mb-2">כי כל אירוע הוא סיפור</h4>
                                <p className="text-gray-700">ב-Event Planning תוכלי לשתף את הסיפור שלך, להנציח את הרגעים המיוחדים ולשמור על הזיכרונות לנצח.</p>
                            </div>
                            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
                                <h4 className="font-bold text-[#6C48C5] mb-2">כי את לא לבד</h4>
                                <p className="text-gray-700">הצטרפי לקהילה תומכת של אנשים שחולקים את התשוקה שלך לאירועים.</p>
                            </div>
                            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
                                <h4 className="font-bold text-[#6C48C5] mb-2">כי תכנון אירוע יכול להיות כיף</h4>
                                <p className="text-gray-700">עם Event Planning, התהליך הופך להיות קל, מהנה ויעיל.</p>
                            </div>
                        </div>
                    </div>

                    {/* Call to action */}
                    <div className="relative py-8">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#1230AE] to-[#6C48C5] opacity-10 rounded-2xl"></div>
                        <p className="relative text-xl font-bold text-[#1230AE] py-4">
                            הצטרפי אלינו היום והתחילי ליצור זיכרונות בלתי נשכחים!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;