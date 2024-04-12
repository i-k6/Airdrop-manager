import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

const TotalEarnings = () => {
  const [inputsColumn1, setInputsColumn1] = useState({
    mainTitle: '',
    twitterId: '',
    discordId: '',
    walletAddress: '',
  });

  const [inputsColumn2, setInputsColumn2] = useState({
    mainTitle: '',
    wallet: '',
    earningsAmount: '',
  });

  const [dataCards, setDataCards] = useState([]);

  const [alertMessageColumn1, setAlertMessageColumn1] = useState('');
  const [alertMessageColumn2, setAlertMessageColumn2] = useState('');

  const handleInputChangeColumn1 = (e, field) => {
    setInputsColumn1({
      ...inputsColumn1,
      [field]: e.target.value,
    });
  };

  const handleInputChangeColumn2 = (e, field) => {
    setInputsColumn2({
      ...inputsColumn2,
      [field]: e.target.value,
    });
  };

  const handleSaveColumn1 = async () => {
    if (!inputsColumn1.mainTitle || !inputsColumn1.twitterId || !inputsColumn1.discordId || !inputsColumn1.walletAddress) {
      setAlertMessageColumn1("Please fill in all fields in User Data before saving.");
      setTimeout(() => {
        setAlertMessageColumn1('');
      }, 3000);
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'column1Data'), inputsColumn1);
      const newData = { ...inputsColumn1, id: docRef.id };
      setDataCards([...dataCards, newData]);
      setInputsColumn1({
        mainTitle: '',
        twitterId: '',
        discordId: '',
        walletAddress: '',
      });
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const handleSaveColumn2 = async () => {
    if (!inputsColumn2.mainTitle || !inputsColumn2.wallet || !inputsColumn2.earningsAmount) {
      setAlertMessageColumn2("Please fill in all fields in Airdrop Data before saving.");
      setTimeout(() => {
        setAlertMessageColumn2('');
      }, 3000);
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'column2Data'), inputsColumn2);
      const newData = { ...inputsColumn2, id: docRef.id };
      setDataCards([...dataCards, newData]);
      setInputsColumn2({
        mainTitle: '',
        wallet: '',
        earningsAmount: '',
      });
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const fetchData = async () => {
    const querySnapshotColumn1 = await getDocs(collection(db, 'column1Data'));
    const column1Data = querySnapshotColumn1.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const querySnapshotColumn2 = await getDocs(collection(db, 'column2Data'));
    const column2Data = querySnapshotColumn2.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setDataCards([...column1Data, ...column2Data]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'column1Data', id));
      await deleteDoc(doc(db, 'column2Data', id));
      const newDataCards = dataCards.filter((data) => data.id !== id);
      setDataCards(newDataCards);
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  return (
    <div className="container max-w-screen-lg mx-auto h-screen overflow-y-auto">
      <div className="flex flex-col md:flex-row items-center justify-center">
        <div className="w-full md:w-96 m-4 rounded-md shadow-xl bg-blue-200 bg-opacity-20 p-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-4">User Data</h3>
          {alertMessageColumn1 && <div className="mb-2 text-red-500">{alertMessageColumn1}</div>}
          <div className="mb-2">
            <label className="block font-bold mb-1">Main Title:</label>
            <input
              type="text"
              className="border rounded-md p-2 w-full text-xl"
              value={inputsColumn1.mainTitle}
              onChange={(e) => handleInputChangeColumn1(e, 'mainTitle')}
            />
          </div>
          <div className="mb-2">
            <label className="block font-bold mb-1">Twitter ID:</label>
            <input
              type="text"
              className="border rounded-md p-2 w-full text-xl"
              value={inputsColumn1.twitterId}
              onChange={(e) => handleInputChangeColumn1(e, 'twitterId')}
            />
          </div>
          <div className="mb-2">
            <label className="block font-bold mb-1">Discord ID:</label>
            <input
              type="text"
              className="border rounded-md p-2 w-full text-xl"
              value={inputsColumn1.discordId}
              onChange={(e) => handleInputChangeColumn1(e, 'discordId')}
            />
          </div>
          <div>
            <label className="block font-bold mb-1">Wallet Address:</label>
            <input
              type="text"
              className="border rounded-md p-2 w-full text-xl"
              value={inputsColumn1.walletAddress}
              onChange={(e) => handleInputChangeColumn1(e, 'walletAddress')}
              onKeyPress={(e) => e.key === 'Enter' && handleSaveColumn1()}
            />
          </div>
          <button onClick={handleSaveColumn1} className="border rounded-md p-2 bg-green-600 text-white mt-4 block mx-auto w-32">
            Save
          </button>
        </div>
        <div className="w-full md:w-96 m-4 rounded-md shadow-xl bg-blue-200 bg-opacity-20 p-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-4">Airdrop Data</h3>
          {alertMessageColumn2 && <div className="mb-2 text-red-500">{alertMessageColumn2}</div>}
          <div className="mb-2">
            <label className="block font-bold mb-1">Main Title:</label>
            <input
              type="text"
              className="border rounded-md p-2 w-full text-xl"
              value={inputsColumn2.mainTitle}
              onChange={(e) => handleInputChangeColumn2(e, 'mainTitle')}
            />
          </div>
          <div className="mb-2">
            <label className="block font-bold mb-1">Wallet:</label>
            <input
              type="text"
              className="border rounded-md p-2 w-full text-xl"
              value={inputsColumn2.wallet}
              onChange={(e) => handleInputChangeColumn2(e, 'wallet')}
            />
          </div>
          <div>
            <label className="block font-bold mb-1">Earnings Amount:</label>
            <input
              type="number"
              className="border rounded-md p-2 w-full text-xl"
              value={inputsColumn2.earningsAmount}
              onChange={(e) => handleInputChangeColumn2(e, 'earningsAmount')}
              onKeyPress={(e) => e.key === 'Enter' && handleSaveColumn2()}
            />
          </div>
          <button onClick={handleSaveColumn2} className="border rounded-md p-2 bg-green-600 text-white mt-4 block mx-auto w-32">
            Save
          </button>
        </div>
        <div className="w-full md:w-96 m-4 mb-20 overflow-x-auto overflow-y-auto">
  <div className="p-4 max-w-screen-lg">
    <h3 className="text-3xl font-bold text-center text-gray-800 mb-4">Data Cards</h3>
    {dataCards.map((data) => (
      <div key={data.id} className="border border-gray-300 bg-blue-400 bg-opacity-20 rounded-md shadow-md p-4 mb-4">
        <p className='font-bold'> {data.mainTitle}</p>
        {data.twitterId && <p>Twitter ID: {data.twitterId}</p>}
        {data.discordId && <p>Discord ID: {data.discordId}</p>}
        {data.walletAddress && <p>Wallet Address: {data.walletAddress}</p>}
        {data.wallet && <p>Wallet: {data.wallet}</p>}
        {data.earningsAmount && <p>Earnings Amount: {data.earningsAmount}$</p>}
        <div className="flex mt-5 justify-center">
          <button onClick={() => handleDelete(data.id)} className="border rounded-md p-2 bg-red-500 text-white mr-2">
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

      </div>
    </div>
  );
};

export default TotalEarnings;
