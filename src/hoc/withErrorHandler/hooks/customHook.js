import {useState, useEffect, useCallback} from 'react';

export default httpClient =>{
    const [error, setError] = useState(null)

            const reqInterceptor = useCallback(() => {
                httpClient.interceptors.request.use(req=>{
                    setError(null)
                return req
            })
        },[httpClient.interceptors.request])
        
        const  resInterceptor = useCallback(()=>httpClient.interceptors.response.use(res=>res,error=>{
                    setError(error)
            }
            ),[httpClient.interceptors.response])

        useEffect(()=>{
            httpClient.interceptors.request.eject(reqInterceptor)
            httpClient.interceptors.response.eject(resInterceptor)
        },[reqInterceptor,resInterceptor])
        const errorHandler =()=>{
            setError(null)
        }
    return {error, errorHandler}

}