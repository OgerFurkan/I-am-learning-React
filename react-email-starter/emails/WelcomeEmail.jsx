import React from 'react'
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

function WelcomeEmail({user_name}) {
  return (
    <Html>
        <Head>
            <title>Welcome To CineHub Club {user_name}</title>
        </Head>
        <Preview>
                Welcome To CineHub Club!
        </Preview>
        <Body>
            <Container style={{
                margin: "5%",
                width:"100%",
                marginLeft:"auto",
                backgroundColor:"#071426",
                boxShadow:"13px 8px 26px 1px #f44531"
            }} >
                <Section style={{
                    height:"500px"
                }}>
                    <Img style={{
                        height:"auto",
                        margin:"20px auto",
                    }}src="https://i.postimg.cc/Jn4vd6GV/Cine-Hub-Logo.png"></Img>
                    <Text style={{
                        margin:"50px",
                        fontSize: "1.5em",
                        fontWeight:"bold",
                        fontFamily:"sans-serif",
                        color:"#f44531",
                        textAlign:"center"
                    }}>Welcome To CineHub Club! {user_name}</Text>

                    <Text style={{
                        margin:"50px",
                        fontWeight:"500",
                        fontFamily:"sans-serif",
                        color:"#f44531",
                        textAlign:"center"
                    }}>
                        We're excited to have you join our community of movie enthusiasts. Get ready to discover, discuss, and enjoy the best films together!
                    </Text>
                        <Button href='https://github.com/OgerFurkan' style={{
                        margin:"0 40%",
                        textAlign:"center",
                        fontWeight:"bold",
                        fontSize:"0.75em",
                        color:"#071426",
                        backgroundColor:" #f44531",
                        padding: "16px",
                        borderRadius: "5px",
                     }}>Go to WebSite</Button>
                </Section>
            </Container>
        </Body>
    </Html>
    
  )
}

export default WelcomeEmail