import { Box, Text, TextField, Image, Button, Icon } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker'

//Material Ui
import CircularProgress from '@mui/material/CircularProgress';
import { height } from '@mui/system';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMxODI4MywiZXhwIjoxOTU4ODk0MjgzfQ.mQiykNHJBcMyNYqwHwSjGJWKHCS1C5G4qVos2JXkcuI';
const SUPABASE_URL = 'https://qkzxtdodujiukugjsljd.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function escutaMensagensEmTempoReal(adicionaMensagem) {
    return supabaseClient
        .from('mensagens')
        .on('INSERT', (respostaLive) => {
            adicionaMensagem(respostaLive.new);
        })
        .subscribe();
}

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

    //Variavel da mensagem a ser digitada e enviada
    const [mensagem, setMensagem] = React.useState('');
    //Lista de mensagens
    const [listaDeMensagem, setListaDeMensagem] = React.useState([]);
    const [carregando, setCarregando] = React.useState(true);
    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username;

    //Hook do React para alteração APENAS quando ocorrer um efeito
    React.useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select('*')
            //Ordena por ID crescente
            .order('id', { ascending: false })
            .then(({ data }) => {
                setListaDeMensagem(data);
                setCarregando(false);
            });
        escutaMensagensEmTempoReal((novaMensagem) => {
            setListaDeMensagem((valorAtualDaLista) => {
                return [
                    //Pega tudo da lista já criada
                    novaMensagem,
                    ...valorAtualDaLista,
                ]
            });
        });

    }, []);

    //Novas mensagens enviadas, com chamada no onKeyPress
    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            //id: listaDeMensagem.length + 1,
            de: usuarioLogado,
            texto: novaMensagem,
        };

        //Realiza o POST no Supabase
        supabaseClient
            .from('mensagens')
            .insert([
                mensagem
            ])
            .then(({ data }) => {

            });
        setMensagem('');
    }

    // ./Sua lógica vai aqui



    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
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
                    opacity: '90%'
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

                    <MessageList mensagens={listaDeMensagem} carregando={carregando} />

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

                        <ButtonSendSticker
                            onStickerClick={(sticker) => {
                                handleNovaMensagem(':sticker:' + sticker);
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

    //function removerMensagem(id) {
    //console.log(id) ta saindo o id que eu clico
    //  const mensagemRemovida = props.mensagens.filter((mensagem) => id !== mensagem.id);
    //console.log(mensagemRemovida) ta saindo o novo array com valores excluidos
    //supabaseClient
    //    .from('mensagens')
    //    .delete()
    //    .match({ id: id })
    //    .then(() => props.setListaDeMensagem(mensagemRemovida))
    //}
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

            {props.carregando && (
                <Box
                    styleSheet={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                >
                    <Box sx={{ display: 'flex', color: 'red' }}>
                        <LoadingKratos />
                    </Box>
                </Box>
            )}

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
                                backgroundColor: appConfig.theme.colors.neutrals['800'],
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
                                    hover: {
                                        transform: 'scale(3.5)',
                                        marginLeft: '25px',
                                        marginRight: '35px',
                                    }
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
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

                            <Button
                                // onClick={(event) => {
                                //    event.preventDefault();
                                //    removerMensagem(mensagem.id);
                                //}}
                                buttonColors={{
                                    contrastColor: '#FDFDFD',
                                    mainColor: 'rgba(0, 0, 0, 0.0)',
                                }}
                                colorVariant="negative"
                                iconName="FaRegTrashAlt"
                            />

                        </Box>
                        {mensagem.texto.startsWith(':sticker:')
                            ? (
                                <Image src={mensagem.texto.replace(':sticker:', '')}
                                    styleSheet={{
                                        width: '100px',
                                    }}
                                />
                            )
                            : (
                                mensagem.texto
                            )}
                    </Text>
                );
            })}
        </Box>
    )
}

function LoadingKratos() {
    return (
        <Box styleSheet={{
            width: '100%',
            height: '500px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Image src="/loading.png" styleSheet={{
                animation: 'rotate-center 2s linear infinite both'
            }} />

            <CircularProgress />

        </Box>
    );
}