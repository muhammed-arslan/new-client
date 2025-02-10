import React, { useContext, useEffect, useState } from 'react'
import { GiStarFormation } from "react-icons/gi";
import { FaAward } from "react-icons/fa";
import { GrCertificate } from "react-icons/gr";
import axios from 'axios';
import { AuthContext } from '../../context/AuthProvider';
import { RiDeleteBin2Line } from "react-icons/ri";
import { Link } from 'react-router-dom';
import Footer from '../../components/footer/Footer'

const Expertises = () => {
    const [awardData, setAwardData] = useState("")
    const [certificateData, setCertificateData] = useState("")
    const [specializeData, setSpecializesData] = useState("")
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useContext(AuthContext)

    useEffect(() => {
        const loading = () => {
            setIsLoading(false)
        }
        const fetchData = async () => {

            const specializesData = await axios.get(`${process.env.REACT_APP_API}specializes`);
            const awardsData = await axios.get(`${process.env.REACT_APP_API}awards`);
            const certificatesData = await axios.get(`${process.env.REACT_APP_API}certificates`);

            setAwardData(awardsData.data.data)
            setCertificateData(certificatesData.data.data)
            setSpecializesData(specializesData.data.data)
            setInterval(loading, 1000)

        }

        fetchData()

    }, [])

    const specializeDataArray = Object.entries(specializeData);
    const certificateDataArray = Object.entries(certificateData);
    const awardDataArray = Object.entries(awardData);

    const specializesDeleteFunc = async (itemId) => {
        await axios.delete(`${process.env.REACT_APP_API}specializes/${itemId}`, {
            headers: {

                'Authorization': `Token ${user}`
            }
        })
        window.location.reload();

    }
    const certificatesDeleteFunc = async (itemId) => {
        await axios.delete(`${process.env.REACT_APP_API}certificates/${itemId}`, {
            headers: {

                'Authorization': `Token ${user}`
            }
        })
        window.location.reload();

    }
    const awardsDeleteFunc = async (itemId) => {
        await axios.delete(`${process.env.REACT_APP_API}awards/${itemId}`, {
            headers: {

                'Authorization': `Token ${user}`
            }
        })
        window.location.reload();

    }
    if (isLoading) {
        return (

            <div class="loader"></div>
        )
    }

    else {
        if (user) {
            return (
                <div className='expertises'>
                    <div className="redirectBtn">
                        <Link to={"/uzmanlıkyonetimi"}> <button>Uzmanlıkları yönet</button></Link>
                    </div>
                    <div className="specializes">
                        <h2>Uzmanlıklarım</h2>
                        {specializeDataArray.map((item, index) => {

                            const itemObject = item[1]

                            return (

                                <div className="specialize">
                                    <span className='delete' onClick={() => specializesDeleteFunc(itemObject._id)} ><RiDeleteBin2Line />  </span>
                                    <div className="infos">
                                        <h2>{itemObject.specializeTitle}</h2>
                                        <p>{itemObject.specializeDesc}</p>
                                    </div>
                                </div>
                            )
                        })}




                    </div>

                    <div className="certificates">
                        <h2>Sertifikalarım</h2>
                        {certificateDataArray.map((item, index) => {

                            const itemObject = item[1]

                            return (

                                <div className="certificate">
                                    <span className='delete' onClick={() => certificatesDeleteFunc(itemObject._id)}><RiDeleteBin2Line />  </span>

                                    <div className="infos">
                                        <h2>{itemObject.certificateTitle}</h2>
                                        <span>{itemObject.certificateCorp}</span>
                                        <span>{itemObject.certificateDate}</span>
                                    </div>
                                </div>
                            )
                        })}





                    </div>
                    <div className="awards">
                        <h2>Ödüllerim</h2>
                        {awardDataArray.map((item, index) => {

                            const itemObject = item[1]

                            return (

                                <div className="award">
                                    <span className='delete' onClick={() => awardsDeleteFunc(itemObject._id)}><RiDeleteBin2Line />  </span>

                                    <div className="infos">
                                        <h2>{itemObject.awardTitle}</h2>
                                        <span>{itemObject.awardCorp}</span>
                                        <span>{itemObject.awardDate}</span>
                                    </div>
                                </div>
                            )
                        })}





                    </div>
                </div>
            )
        } else {
            return (
                <div className='expertises'>
                    <div className="specializes">
                        <h2>Uzmanlıklarım</h2>
                        {specializeDataArray.map((item, index) => {

                            const itemObject = item[1]

                            return (

                                <div className="specialize">
                                    
                                    <span>{itemObject.path && <img className='expimage' src={itemObject.path} alt="" /> || <GiStarFormation /> }   </span>
                                    <div className="infos">
                                        <h2>{itemObject.specializeTitle}</h2>
                                        <p>{itemObject.specializeDesc}</p>
                                    </div>
                                </div>
                            )
                        })}




                    </div>

                    <div className="certificates">
                        <h2>Sertifikalarım</h2>
                        {certificateDataArray.map((item, index) => {

                            const itemObject = item[1]

                            return (

                                <div className="certificate">
                                    <span>{itemObject.path && <img className='expimage' src={itemObject.path} alt="" /> ||<GrCertificate />  } </span>
                                    <div className="infos">
                                        <h2>{itemObject.certificateTitle}</h2>
                                        <span>{itemObject.certificateCorp}</span>
                                        <span>{itemObject.certificateDate}</span>
                                    </div>
                                </div>
                            )
                        })}





                    </div>
                    <div className="awards">
                        <h2>Ödüllerim</h2>
                        {awardDataArray.map((item, index) => {

                            const itemObject = item[1]

                            return (

                                <div className="award">
                                    <span>{itemObject.path && <img className='expimage' src={itemObject.path} alt="" /> || <FaAward /> }  </span>
                                    <div className="infos">
                                        <h2>{itemObject.awardTitle}</h2>
                                        <span>{itemObject.awardCorp}</span>
                                        <span>{itemObject.awardDate}</span>
                                    </div>
                                </div>
                            )
                        })}





                    </div>
         {/* <Footer/> */}

                </div>
            )
        }
    }
}

export default Expertises