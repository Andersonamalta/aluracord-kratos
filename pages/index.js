import appConfig from '../config.json';
import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import { useRouter} from 'next/router';


function Title(props) {
    console.log(props)
    const Tag = props.tag;
    return (
        <>
            <Tag>{props.children}</Tag>

            <style jsx>{`
                ${Tag}{
                    color: ${appConfig.theme.colors.primary['050']};
                    font-size: 24px;
                    font-weight: 600;
                }
            `}
            </style>

        </>
    );
}

// Componente React
//function HomePage() {
// JSX
//    return (
//        <div>
//            <GlobalStyle />
//            <Title tag="h2" >Boa vindas de volta!!</Title>
//            <h2>Discord - Alura Matrix</h2>
//        </div>
//    )

//}

//export default HomePage

export default function PaginaInicial() {
    //const username = 'Andersonamalta';
    const [username, setUsername] = React.useState('');
    const roteamento = useRouter();
    const [dados, setDados] = React.useState([]);

    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.neutrals['000'],
                    backgroundImage: 'url(/background-god-of-war.jpeg)',
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '700px',
                        borderRadius: '5px', padding: '32px', margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.neutrals['000'],
                        backgroundImage: 'url(/sangue.jpeg)'
                    }}
                >
                    {/* Formulário */}
                    <Box
                        as="form"
                        onSubmit = {function (event){
                            event.preventDefault();
                            console.log('Alguém submeteu um form');
                            roteamento.push('/chat');
                            //window.location.href = '/chat';

                        }}
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                    >
                        <Title tag="h2">Boas vindas de volta!</Title>
                        <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.primary['100'] }}>
                            {appConfig.name} {username}
                        </Text>
                        <TextField
                            value={username}
                            onChange={function (event) {
                                console.log('usuario digitou', event.target.value);
                                // Onde está o valor?
                                const valor = event.target.value;
                                // Trocar o valor da variavel
                                // Através do React e avise quem precisa
                                setUsername(valor);
                                
                                fetch(`https://api.github.com/users/${valor}`)
                                .then(response => response.json())
                                .then(data => {
                                setDados(data)
                                })
                            }}
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals['200'],
                                    mainColor: appConfig.theme.colors.neutrals['700'],
                                    mainColorHighlight: appConfig.theme.colors.primary['100'],
                                    backgroundColor: appConfig.theme.colors.neutrals['800'],
                                },
                            }}
                        />
                        {username.length > 2 && username.length !== null && username.trim() && (
                            <Button
                                type='submit'
                                label='Entrar'
                                fullWidth
                                buttonColors={{
                                    contrastColor: appConfig.theme.colors.neutrals["000"],
                                    mainColor: appConfig.theme.colors.primary['200'],
                                    mainColorLight: appConfig.theme.colors.primary['100'],
                                    mainColorStrong: appConfig.theme.colors.primary['100'],
                                }}
                            />
                        )}
                    </Box>
                    {/* Formulário */}
                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '16px',
                            flex: 1,
                            minHeight: '240px',
                        }}
                    >
                        <Image
                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '16px',
                            }}

                            src = {`${username.length <=2 
                                ? 'https://i.ibb.co/Ch4m85T/erro.png'
                                : `https://github.com/${username}.png`
                            }`}
                            
                            //src={`https://github.com/${username}.png`}
                        />
                        <Text
                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals['200'],
                                backgroundColor: appConfig.theme.colors.neutrals['900'],
                                padding: '3px 10px',
                                borderRadius: '1000px'
                            }}
                            
                        >
                            
                            {username.length <=2 ? "Usuário não encontrado " : `${username}`}
                        </Text>

                        <Text
                            variant="body4"
                            styleSheet={{
                            margin:'5px', borderBottom: 'solid 1px black',color: appConfig.theme.colors.neutrals['999']
                            }}
                            >
                            Followers: {dados.followers}
                        </Text>

                        <a
                            target="_blank"
                            variant="body4"
                            style={{
                                border: 'solid 1px black', padding: '0px 5px', borderRadius: '10px', textDecoration: 'none', color: appConfig.theme.colors.neutrals['999'], fontSize: '15px', cursor: 'pointer'
                            }}
                            href={dados.url}>
                            GitHub
                        </a>

                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}