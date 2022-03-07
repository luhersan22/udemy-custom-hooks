import { useEffect, useRef, useState } from "react"


export const useFetch = ( url ) => {

    const isMounted = useRef(true);
    const [state, setState] = useState({ data: null,  loading: true, error: null })

    //Se ejecuta solo una vez
    //El return se ejecuta cuando se desmonta el componente
    useEffect(() => {
        return () => {
            isMounted.current = false;
        }
    }, []); 


    //Este efecto se va a ejecutar unicamente cuando cambia el url
    useEffect(()=> {

        setState({
            loading: true,
            error: null,
            data: null
        });

        fetch( url )
            .then( resp => resp.json() )
            .then( data => {

                if(isMounted.current) {
                    setState({
                        loading: false,
                        error: null,
                        data
                    });
                } else {
                    console.log('set stata no se llamó')
                }

            });

    }, [url]);


    return state;

}
