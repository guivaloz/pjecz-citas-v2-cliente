import React, {  useState } from 'react'
import PropTypes from 'prop-types'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined'
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied'
import { Box, Button, Grid, Input, Rating, styled, TextField, Typography } from '@mui/material'
import ContainerCardCenter from '../ui/ContainerCardCenter'
import commonSX from '../../theme/CommonSX'
import { GetPollSystem, UpdatePollSystem } from '../../actions/EncuestaActions'
import { useLocation, useNavigate } from 'react-router-dom'


const StyledRating = styled(Rating)(({ theme }) => ({
    '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
      color: theme.palette.action.disabled,
    },
}))

const customIcons = {
    1: {
        icon: <SentimentVeryDissatisfiedIcon color="error" />,
        label: 'Muy Difícil',
        
    },
    2: {
        icon: <SentimentDissatisfiedIcon color="dissatisfied" />,
        label: 'Difícil',
    },
    3: {
        icon: <SentimentSatisfiedIcon color="warning" />,
        label: 'Neutral',
    },
    4: {
        icon: <SentimentSatisfiedAltIcon color="satisfied" />,
        label: 'Fácil',
    },
    5: {
        icon: <SentimentVerySatisfiedIcon color="success" />,
        label: 'Muy Fácil',
    },
}

const labels = {
  
    1: "Muy Difícil",
  
    2: "Difícil",
  
    3: "Neutral",
  
    4: "Fácil",
  
    5: "Muy Fácil",
  
  };
  
  function getLabelText(value) {
    return `${value} ${value !== 1 ? '' : ''}, ${labels[value]}`;
  }

function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>
}



export const EncuestaSistema = () => {

    const navigate = useNavigate()

    let {search} = useLocation()
    let parametros = new URLSearchParams(search)
    let hashid = parametros.get('hashid');

    const [hashOK, setHashOK] = useState(false)

    const [error, setError ] = useState('')
    
    const checkHash = async() => {
        await GetPollSystem(hashid).then( response => {
            if(response){
                
                if(response.status === 200){
                    
                    setHashOK(true);

                }else{
                    setError(response.data.detail)
                    setHashOK(false);
                }

            }
        })
    }
    
    if(hashid === null){
        setHashOK(false)
    }else{
        
        checkHash();

    }

    const [ratingValue, setReatingValue] = useState(IconContainer.value)

    const handleChangeRating = (event, newValue) => {
        setReatingValue(newValue)
    }

    const [ formData, setFormData ] = useState({
        respuesta_01:0,
        respuesta_02:'',
        respuesta_03:'',
        hashid:hashid,
    })

    const { respuesta_01, respuesta_02} = formData

    const handleChangeInputs = (e) => {
        
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }
    

    const enviarInformacion = async(e) => {
        e.preventDefault()
        
        if(respuesta_02 === ''){
            setError('Debes llenar este campo')
            return false
        }
        formData.respuesta_01 = ratingValue
        await UpdatePollSystem(formData).then(response => {
            if(response){
                if(response.status === 200){
                    navigate('/poll_response')
                    
                }else {
                    
                    setError(response.data.detail)
                }

                if(response.status === 406 || 404){
                    setError(response.data.detail)
                }
            }
        })

    }
  
    if(hashOK){

    return (
        <>
            <ContainerCardCenter sx={{}}>
                <Typography variant='h4' sx={commonSX.title} style={{color:'#022E66'}}>
                    Encuesta de sistema
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>

                        <Typography variant='body1' gutterBottom>
                            ¿Cómo fue tu experiencia con el Sistema de Citas Versión 2?
                        </Typography>
                        <StyledRating
                            name="respuesta_01"
                            id='respuesta_01'
                            IconContainerComponent={IconContainer}
                            getLabelText={(value) => customIcons[value].label}
                            highlightSelectedOnly
                            onChange={handleChangeRating}
                        />
                        {
                            ratingValue <= respuesta_01 ?
                            
                            <span></span> 
                            :
                            <Box style={{ color:'#014DAE'}}>{getLabelText(ratingValue)}</Box> 
                                
                        }
                       
                    </Grid>
                    <Grid item xs={12} sm={12}>

                        <Typography variant='body1' gutterBottom>
                            ¿Por qué?
                        </Typography>
                        <TextField
                            id="respuesta_02"
                            label="Escribe tu opinión"
                            name="respuesta_02"
                            onChange={handleChangeInputs}
                            multiline
                            rows={4}
                            placeholder="Escribe tu opinión"
                            style={{ width: '100%' }}
                        />
                    </Grid>
                    {
                        error ? <span style={{color: '#BC0B0B', marginTop:4, inlineSize:'1620px', fontSize:18 }}>{error}</span> : null
                    }
                    <Grid item xs={12} sm={12}>

                        <Typography variant='body1' gutterBottom>
                            ¿Tienes algún comentario para nosotros?
                        </Typography>
                        <TextField
                            id="respuesta_03"
                            label="Escribe tu opinión"
                            name="respuesta_03"
                            onChange={handleChangeInputs}
                            multiline
                            rows={4}
                            placeholder="Escribe tu opinión"
                            style={{ width: '100%' }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Button 
                            variant='contained'  
                            color='info' 
                            style={{ float:'right'}}
                            type='submit'
                            onClick={enviarInformacion}
                        >
                            Envíar
                        </Button>
                    </Grid>
                </Grid>
                <Input
                    type="hidden"
                    value={hashid}
                    name="hashid"
                />
            </ContainerCardCenter>
        </>
    )

    }else{

    return(
        <>
            <ContainerCardCenter>
                <Typography variant='h5' gutterBottom style={{ textTransform:'uppercase', color:'#022E66'}}>
                    Revisa tu información
                </Typography>
                <Typography variant='body1'>
                    {error}
                </Typography>
            </ContainerCardCenter>
        </>
    )

  }


}   


IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
}
