import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { useNavigate } from 'react-router-dom'
import { IKContext, IKUpload } from 'imagekitio-react';
import axios from 'axios'

const ExpertiseCommand = () => {
    const { user } = useContext(AuthContext)
    const [spcTitle, setSpcTitle] = useState("")
    const [spcDesc, setSpcDesc] = useState("")
    const [crfTitle, setCrfTitle] = useState("")
    const [crfCorp, setCrfCorp] = useState("")
    const [crfDate, setCrfDate] = useState("")
    const [awrTitle, setAwrTitle] = useState("")
    const [awrCorp, setAwrCorp] = useState("")
    const [awrDate, setAwrDate] = useState("")
    const [file, setFile] = useState("no");
    const [status, setStatus] = useState('hazir');

    const navigate = useNavigate()
    useEffect(() => {
        if (user === null) {
            navigate("/404")
        }
    }, [])
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
        setStatus('hazir');
    };

    const handleSpc = async (e) => {
        e.preventDefault()

     

       
        if (status === 'hazir') {
       await axios.post(`${process.env.REACT_APP_API}specializes`, {
            specializeTitle: spcTitle,
            specializeDesc: spcDesc,
            path: file.url,
          },{
            headers: {
                'Authorization': `Token ${user}`
            }
            
        })
        window.location.reload()

    }
    else{
        alert("ikonun yüklenmesini bekleyin")
    }
          
         
    }
    const handleCrf = async (e) => {
        e.preventDefault()

     

        if (status === 'hazir') {
        await axios.post(`${process.env.REACT_APP_API}certificates`, {
            certificateTitle: crfTitle,
            certificateCorp: crfCorp,
            certificateDate: crfDate,
            path: file.url,
           },{
             headers: {
                 'Authorization': `Token ${user}`
             }
         })
         window.location.reload()

        }
        else{
            alert("ikonun yüklenmesini bekleyin")
        }
           

    }
    const handleAwr = async (e) => {
        e.preventDefault()

     

        if (status === 'hazir') {
        await axios.post(`${process.env.REACT_APP_API}awards`, {
            awardTitle: awrTitle,
            awardCorp: awrCorp,
            awardDate: awrDate,
            path: file.url,
           },{
             headers: {
                 'Authorization': `Token ${user}`
             }
         })
         window.location.reload()
        }
        else{
            alert("ikonun yüklenmesini bekleyin")
        }
           
    }
    return (
        <div className='uzmanlikyonetim'>
            <div className="spcForm">
                <form>
                    <h4>Uzmanlık Ekle</h4>
                    Uzmanlık Başlığı:
                    <input type="text" onChange={(e) => setSpcTitle(e.target.value)} />
                    Uzmanlık Açıklaması:
                    <input type="text" onChange={(e) => setSpcDesc(e.target.value)} />
                    İkon:
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
                    <button onClick={(e) => handleSpc(e)}>Uzmanlık ekle</button>
                </form>
            </div>
            <div className="crfForm">
                <form>
                    <h4>Sertifika Ekle</h4>
                    Sertifika Başlığı:
                    <input type="text" onChange={(e) => setCrfTitle(e.target.value)} />
                    Sertifika Veren:
                    <input type="text" onChange={(e) => setCrfCorp(e.target.value)} />
                    Sertifika Tarihi:
                    <input type="text" onChange={(e) => setCrfDate(e.target.value)} />
                    İkon:
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
                    <button onClick={(e) => handleCrf(e)}>Sertifika ekle</button>
                </form>
            </div>
            <div className="awrForm">
                <form>
                    <h4>Ödül Ekle</h4>
                    Ödül Başlığı:
                    <input type="text" onChange={(e) => setAwrTitle(e.target.value)} />
                    Ödül Veren:
                    <input type="text" onChange={(e) => setAwrCorp(e.target.value)} />
                    Ödül Tarihi:
                    <input type="text" onChange={(e) => setAwrDate(e.target.value)} />
                    İkon:
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
                    <button onClick={(e) => handleAwr(e)}>Ödül ekle</button>
                </form>
            </div>
        </div>
    )
}

export default ExpertiseCommand