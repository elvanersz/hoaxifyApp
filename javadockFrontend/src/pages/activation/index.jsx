import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {Alert} from "../../shared/components/Alert.jsx";
import {Spinner} from "../../shared/components/Spinner.jsx";

export function Activation() {
    const {activationToken} = useParams()
    const [apiProgress, setApiProgress] = useState(true);
    const [successMessage, setSuccessMessage] = useState();
    const [errorMessage, setErrorMessage] = useState();

    function activateUser(activationToken) {
        return axios.patch(`/api/v1/users/${activationToken}/active`)
    }

    useEffect(() => {
        async function activate() {
            setApiProgress(true)
            try {
                const response = await activateUser(activationToken);
                setSuccessMessage(response.data.message)
            } catch (error) {
                setErrorMessage(error.response.data.message)
            } finally {
                setApiProgress(false);
            }
        }
        //activate()
    }, [])

    return <>
        {apiProgress && (
            <Alert styleType="secondary" center>
                <Spinner />
            </Alert>
        )}
        {successMessage && (
            <Alert styleType="success" center>{successMessage}</Alert>
        )}
        {errorMessage && (
            <Alert styleType="danger" center>{errorMessage}</Alert>
        )}
    </>
}