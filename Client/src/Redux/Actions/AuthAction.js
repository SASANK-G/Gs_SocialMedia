import * as AuthAPi from '../../Api/AuthRequest'

export const logIn = (formData) => async(dispatch)=>{
  dispatch({type:"AUTH_START"})
  try {
    
    const {data}=await AuthAPi.logIn(formData)
    dispatch({type:"AUTH_SUCCESS", data:data})
  } catch (error) {
    console.log(error)
  dispatch({type:"AUTH_FAIL"})

  }
}



export const signUp = (formData) => async(dispatch)=>{
  dispatch({type:"AUTH_START"})
  try {
    
    const {data}=await AuthAPi.logIn(formData)
    dispatch({type:"AUTH_SUCCESS", data:data})
  } catch (error) {
    console.log(error)
  dispatch({type:"AUTH_FAIL"})

  }
}