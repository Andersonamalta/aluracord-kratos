import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React, { useEffect, useState } from 'react';
import appConfig from '../config.json';

export default function ChatPage() {
    /* 
    // Usuário
    - Usuário digita no campo
    - Aperta enter para enviar
    - Tem que adicionar o texto na listagem

    // Dev
    - [X] Campo criado
    - [] Vamos usar o onChange, usar o useState (ter if para caso seja enter pra limpar a variavel)
    - [] Lista de mensagem  
    */

    // Sua lógica vai aqui

    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagem, setListaDeMensagem] = React.useState([]);

    // Variável para receber a resposta da API Rest 
    const [userData, setUserData] = useState({});

    // Variável para receber a entrada do usuário
    const [username, setUsername] = React.useState('Andersonamalta');

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

    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            id: listaDeMensagem.length + 1,
            de: `${userData.login}`,
            texto: novaMensagem,
        }
        setListaDeMensagem([
            mensagem,
            ...listaDeMensagem,
        ]);
        setMensagem('');
    }


    // ./Sua lógica vai aqui



    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.neutrals['000'],
                backgroundImage: 'url(/background-god-of-war.jpeg)',
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals['999'],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals['600'],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    <MessageList mensagens={listaDeMensagem} />

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setMensagem(valor);
                            }}
                            // Verifica se o enter foi apertado
                            onKeyPress={(event) => {
                                if (event.key === "Enter") {
                                    event.preventDefault();
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals['800'],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals['200'],
                            }}
                        />
                        <Button
                            value={mensagem}
                            onClick={(event) => {
                                event.preventDefault();
                                handleNovaMensagem(mensagem);
                            }}

                            label='Enviar'
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary['200'],
                                mainColorLight: appConfig.theme.colors.primary['100'],
                                mainColorStrong: appConfig.theme.colors.primary['100'],
                            }}
                            styleSheet={{
                                padding: '12px',
                                marginBottom: '9px'
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    buttonColors={{
                        contrastColor: appConfig.theme.colors.neutrals["000"],
                        mainColor: appConfig.theme.colors.primary['200'],
                        mainColorLight: appConfig.theme.colors.primary['100'],
                        mainColorStrong: appConfig.theme.colors.primary['100'],
                    }}
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    console.log('MessageList', props);
    
    // Deletar mensagem
    //const handleDeleteMessage = (id) => {
    //    setMensagens([...mensagens].filter(mensagem => mensagem.id !== id))
    // }
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals['700'],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/vanessametonini.png`}
                            />
                            <Text tag="strong">
                                {mensagem.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals['300'],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        {mensagem.texto}
                    </Text>
                );
            })}
        </Box>
    )
}