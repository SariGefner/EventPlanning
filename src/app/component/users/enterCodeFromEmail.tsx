import React, { useState } from 'react';
import Swal from 'sweetalert2';

const EnterCodeFromEmail: React.FC<{ onBack: (currentStep: 'LoginWithPassword' | 'newPassword', myCodeFromEmail: string) => void }> = ({ onBack }) => {
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCodeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('')
    onBack('newPassword', code)
    Swal.fire({
      title: 'אימות הצליח!',
      text: 'מעביר אותך לטופס איפוס הסיסמה...',
      icon: 'success',
      confirmButtonText: 'אישור',
      customClass: {
        popup: 'swal2-rtl'
      },
      timer: 2000, 
      timerProgressBar: true,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      didOpen: () => {
        Swal.showLoading();
      }
    });
  };

  return (
    <div>
      <h2 className="text-red-400 text-2xl font-bold text-center mb-6">איפוס סיסמה</h2>
      <form onSubmit={handleCodeSubmit} className="space-y-4">
        <div>
          <label htmlFor="code" className="block font-medium">הזן את הקוד שנשלח למייל</label>
          <input
            id="code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        <button type="submit" className="w-full bg-red-400 text-white py-2 px-4 rounded-lg">אשר</button>
      </form>
      <button onClick={() => { setErrorMessage(''); onBack('LoginWithPassword', '') }} className="text-blue-500 underline mt-4">חזרה</button>
    </div>
  );
};

export default EnterCodeFromEmail;
