import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IKContext, IKUpload } from 'imagekitio-react';

const PropertyCommand = () => {
    const { user } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [url, setUrl] = useState('');
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState('fotograf secilmedi');
    const [propertyType, setPropertyType] = useState('rent');
    const navigate = useNavigate();

    useEffect(() => {
        if (user === null) {
            navigate('/404');
        }
    }, [user, navigate]);

    const publicKey = 'public_QOs22nK4wH36Pc1OWPQyxeeS2tI=';
    const urlEndpoint = 'https://ik.imagekit.io/fvqpop13s';
    const authenticator = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API}image/auth`);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Request failed with status ${response.status}: ${errorText}`);
            }
            const data = await response.json();
            const { signature, expire, token } = data;
            return { signature, expire, token };
        } catch (error) {
            throw new Error(`Authentication request failed: ${error.message}`);
        }
    };

    const onError = (err) => {
        setStatus('fotograf yuklenirken bir hata oldu');
        console.log(err);
    };

    const onSuccess = (res) => {
        setFile(res);
        setStatus('fotograf yuklendi');
    };

    const handleProperty = async (e) => {
        e.preventDefault();

        if (status === 'fotograf yuklendi') {
            await axios.post(
                `${process.env.REACT_APP_API}properties/add`,
                {
                    baslik: title,
                    konum: location,
                    fiyat: price,
                    url: url,
                    path: file.url,
                    sellorrent: propertyType, // Include the property type in the payload
                },
                {
                    headers: {
                        Authorization: `Token ${user}`,
                    },
                }
            );
            navigate('/ilanlar');
        } else {
            alert('fotografsiz ilan eklenemez');
        }
    };

    return (
        <div className="ilanyonetim">
            <div className="form">
                <form>
                    <h4>İlan Ekle</h4>
                    İlan Başlığı:
                    <input type="text" onChange={(e) => setTitle(e.target.value)} />
                    İlan Konumu:
                    <input type="text" onChange={(e) => setLocation(e.target.value)} />
                    İlan Fiyatı:
                    <input type="text" onChange={(e) => setPrice(e.target.value)} />
                    İlan tipi:
                    <select
                        value={propertyType} // Bind the state to the select value
                        onChange={(e) => setPropertyType(e.target.value)} // Update state on change
                    >
                        <option value="rent">kiralık</option>
                        <option value="sale">satılık</option>
                    </select>
                    İlan linki:
                    <input type="text" onChange={(e) => setUrl(e.target.value)} />
                    İlan fotoğrafı:
                    <IKContext
                        publicKey={publicKey}
                        urlEndpoint={urlEndpoint}
                        authenticator={authenticator}
                    >
                        <IKUpload
                            onError={onError}
                            onSuccess={onSuccess}
                            onClick={() => setStatus('fotograf yukleniyor lutfen bekleyin...')}
                        />
                        <p>{status}</p>
                    </IKContext>
                    <button onClick={(e) => handleProperty(e)}>İlan ekle</button>
                </form>
            </div>
        </div>
    );
};

export default PropertyCommand;
