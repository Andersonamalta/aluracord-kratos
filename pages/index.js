import appConfig from '../config.json';
import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';


function Title(props) {
    console.log(props)
    const Tag = props.tag;
    return (
        <>
            <Tag>{props.children}</Tag>

            <style jsx>{`
                ${Tag}{
                    color: ${appConfig.theme.colors.primary['050']};
                    font-size: 20px;
                    font-weight: 600;
                    margin-top: 50px;
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
    // Variável para receber a entrada do usuário
    const [username, setUsername] = React.useState('');
    const roteamento = useRouter();

    // Variável para receber a resposta da API Rest 
    const [userData, setUserData] = useState({});

    //Precisamos buscar os dados do usuário, toda vez que houver uma atualização no nome do usuário, 
    //para isso usamos o hook useEffect do React.
    useEffect(() => {
        getUserData();
    }, [username]);

    var gitHubUrl = `https://api.github.com/users/${username}`;

    // Agora para obter a resposta da API de usuários do GitHub, vamos fazer uma requisição GET usando Fetch, 
    //que será o papel da função getUserData().
    //getUserData() é uma função assíncrona , na qual fetch(gitHubUrl) faz a solicitação e retorna uma promessa. 
    //Quando a solicitação for concluída, a promessa será resolvida com o objeto de resposta . 
    //Esse objeto é basicamente um placeholder genérico para vários formatos de resposta.
    const getUserData = async () => {
        const response = await fetch(gitHubUrl);
        //response.json() é usado para extrair o objeto JSON da resposta, ele retorna uma promessa, daí o await. 
        const jsonData = await response.json();
        if (jsonData && jsonData.message != "Not Found") {
            setUserData(jsonData);
            console.log(jsonData);
        } else if (username !== "") {
            console.log('Username does not exist')
        } else {
            setUserData({})
        }
    };

    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'rigth',
                    backgroundColor: appConfig.theme.colors.neutrals['000'],
                    backgroundImage: 'url(/background-god-of-war.jpeg)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundBlendMode: 'multiply',
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'columm',
                        },
                        width: '100%',
                        maxWidth: '400px',
                        height: {
                            xs: '',
                            sm: '100%'
                        },
                        padding: '32px',
                        margin: {
                            xs: '16px',
                            sm: '100px'
                        },
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        //backgroundColor: appConfig.theme.colors.neutrals['000'],
                        backgroundImage: 'url(/sangue.jpeg)',
                    }}
                >
                    {/* Formulário */}
                    <Box
                        as="form"
                        onSubmit={function (event) {
                            event.preventDefault();
                            roteamento.push(`/chat?username=${username}`);
                            //window.location.href = '/chat';

                        }}
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: { xs: '100%', sm: '85%' },
                            textAlign: 'center',
                            marginBottom: '32px',
                        }}
                    >
                        <Title tag="h2">Saudações guerreiro nordico!</Title>
                        <Text variant="body3"
                            styleSheet={{
                                marginBottom: '32px',
                                color: appConfig.theme.colors.primary['100']
                            }}>
                            {appConfig.name} 🛡️{username}⚔️
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

                            }}
                            placeholder='Digite seu usuário no GitHub'
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

                            src={`${username.length <= 2
                                ? '/logo-git.png'
                                : `https://github.com/${username}.png`
                                }`}

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

                            {username.length <= 2 ? "Usuário não encontrado " : `${userData.name}`}

                        </Text>

                        {username.length <= 2

                            ? (
                                " "
                            )

                            : (

                                <Text
                                    variant="body4"
                                    styleSheet={{
                                        color: appConfig.theme.colors.neutrals['200'],
                                        backgroundColor: appConfig.theme.colors.neutrals['900'],
                                        padding: '3px 10px', borderRadius: '1000px', marginTop: '5px', width: '200px',
                                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                                    }}
                                >
                                    Seguidores: {userData.followers}  -  Repositórios: {userData.public_repos}

                                </Text>

                            )}

                        {username.length <= 2

                            ? (
                                " "
                            )

                            : (

                                <Text
                                    variant="body4"
                                    styleSheet={{
                                        color: appConfig.theme.colors.neutrals['200'],
                                        backgroundColor: appConfig.theme.colors.neutrals['900'],
                                        padding: '3px 10px', borderRadius: '1000px', marginTop: '5px', width: '200px',
                                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                                    }}
                                >
                                    {userData.location}

                                </Text>

                            )}

                        {username.length <= 2

                            ? (
                                " "
                            )

                            : (

                                <a
                                    target="_blank"
                                    variant="body4"
                                    style={{
                                        border: 'solid 1px black', 
                                        padding: '0px 5px',
                                        borderRadius: '10px', 
                                        textDecoration: 'none',
                                        color: appConfig.theme.colors.neutrals['999'],
                                        fontSize: '15px', 
                                        cursor: 'pointer', 
                                        marginTop: '10px'
                                    }}
                                    href={userData.html_url}>
                                    GitHub
                                </a>

                            )}

                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}