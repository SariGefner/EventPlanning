import React from 'react';
import { Scroll, Shield } from 'lucide-react';

const TermsPage = () => {
    return (
        <div className="relative min-h-screen bg-[#FFF7F7]">
          
            <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-[#C68FE6] opacity-20 blur-xl"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-[#6C48C5] opacity-20 blur-xl"></div>

            <div className="container mx-auto py-12 px-4 max-w-4xl relative">
                {/* Title section with decorative elements */}
                <div className="relative mb-12 text-center">
                    <h1 className="text-5xl font-bold text-[#1230AE] mb-2">תקנון האתר</h1>
                    <div className="w-24 h-1 bg-[#6C48C5] mx-auto rounded-full"></div>
                </div>

                <div className="space-y-8 text-right">
                    {/* Introduction section */}
                    <div className="bg-gradient-to-r from-[#1230AE]/10 to-[#6C48C5]/10 p-8 rounded-2xl">
                        <h2 className="text-2xl font-bold text-[#1230AE] mb-4">מבוא</h2>
                        <div className="space-y-4 text-gray-700">
                            <p>1.1 אתר event planning (להלן: &quot;האתר&quot;) הינו פלטפורמה מקוונת המאפשרת למשתמשים לשתף אירועים, תמונות, סרטונים והודעות (להלן: &quot;התכנים&quot;).</p>
                            <p>1.2 שימוש באתר מהווה הסכמה מלאה לתנאי תקנון זה.</p>
                        </div>
                    </div>

                    {/* Terms of Use section */}
                    <div className="bg-white rounded-3xl shadow-lg p-8 border border-[#C68FE6]/20">
                        <h2 className="text-2xl font-bold text-[#6C48C5] mb-6">תנאי שימוש</h2>
                        
                        {/* Registration subsection */}
                        <div className="mb-6 p-6 bg-gradient-to-r from-[#FFF7F7] to-white rounded-xl border-r-4 border-[#6C48C5]">
                            <h3 className="text-xl font-bold text-[#1230AE] mb-3">הרשמה</h3>
                            <p className="text-gray-700">על מנת להשתמש באתר, נדרשת הרשמה. המשתמש מתחייב למסור פרטים נכונים ומדויקים בעת ההרשמה.</p>
                        </div>

                        {/* Content subsection */}
                        <div className="mb-6 p-6 bg-gradient-to-r from-[#FFF7F7] to-white rounded-xl border-r-4 border-[#6C48C5]">
                            <h3 className="text-xl font-bold text-[#1230AE] mb-3">תכנים</h3>
                            <ul className="space-y-3 text-gray-700 list-disc pr-6">
                                <li>המשתמש אחראי באופן בלעדי על התכנים שהוא מעלה לאתר.</li>
                                <li>המשתמש מתחייב שלא להעלות תכנים המפרים זכויות יוצרים, סימני מסחר או כל זכות קניין רוחני אחרת.</li>
                                <li>המשתמש מתחייב שלא להעלות תכנים המכילים תוכן פורנוגרפי, גזעני, אלים, מאיים, משמיץ, מפלה או פוגע בפרטיות.</li>
                                <li>המשתמש מתחייב שלא להשתמש בשפה גסה או מעליבה.</li>
                            </ul>
                        </div>

                        {/* Responsibility subsection */}
                        <div className="p-6 bg-gradient-to-r from-[#FFF7F7] to-white rounded-xl border-r-4 border-[#6C48C5]">
                            <h3 className="text-xl font-bold text-[#1230AE] mb-3">אחריות</h3>
                            <ul className="space-y-3 text-gray-700 list-disc pr-6">
                                <li>המשתמש נושא באחריות מלאה לכל נזק שייגרם כתוצאה מהפרת תנאי התקנון.</li>
                                <li>מפעילי האתר אינם אחראים לתכנים המועלים על ידי המשתמשים.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Privacy and Changes section */}
                    <div className="relative bg-gradient-to-br from-[#1230AE]/5 to-[#C68FE6]/5 rounded-3xl p-8">
                        <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-[#C68FE6]/20"></div>
                        <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-[#6C48C5]/20"></div>
                        
                        <div className="space-y-6 relative z-10">
                            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
                                <h3 className="text-xl font-bold text-[#6C48C5] mb-3">פרטיות</h3>
                                <p className="text-gray-700">מדיניות הפרטיות של האתר מגדירה את אופן איסוף, שימוש והגנה על המידע האישי של המשתמשים.</p>
                            </div>
                            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
                                <h3 className="text-xl font-bold text-[#6C48C5] mb-3">שינויים בתקנון</h3>
                                <p className="text-gray-700">מפעילי האתר רשאים לשנות את תקנון זה מעת לעת. על המשתמש להתעדכן בתנאי התקנון בכל כניסה לאתר.</p>
                            </div>
                        </div>
                    </div>

                    {/* Violation and Jurisdiction section */}
                    <div className="relative py-8">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#1230AE] to-[#6C48C5] opacity-10 rounded-2xl"></div>
                        <div className="relative p-6 space-y-6">
                            <div>
                                <h3 className="text-xl font-bold text-[#1230AE] mb-3">הפרת התקנון</h3>
                                <p className="text-gray-700">במקרה של הפרת תנאי התקנון, מפעילי האתר רשאים לחסום את גישתו של המשתמש לאתר, למחוק את תכניו ולנקוט בכל צעד משפטי אחר.</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[#1230AE] mb-3">שיפוט</h3>
                                <p className="text-gray-700">על כל מחלוקת הנובעת מהתקנון או הקשורה אליו יחולו דיני מדינת ישראל ובית המשפט המוסמך בתל אביב-יפו יהיה בעל סמכות שיפוט ייחודית.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsPage;