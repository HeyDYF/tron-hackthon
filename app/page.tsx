"use client"

import { useState, useEffect } from 'react'
import { MapPin, Award, Users, Sun, Moon, Globe, TreePine } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"



declare global {
    interface Window {
        tronWeb: any;
    }
}
const ABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "type": "error",
        "name": "ERC721IncorrectOwner"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "type": "error",
        "name": "ERC721InsufficientApproval"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "approver",
                "type": "address"
            }
        ],
        "type": "error",
        "name": "ERC721InvalidApprover"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            }
        ],
        "type": "error",
        "name": "ERC721InvalidOperator"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "type": "error",
        "name": "ERC721InvalidOwner"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "receiver",
                "type": "address"
            }
        ],
        "type": "error",
        "name": "ERC721InvalidReceiver"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "type": "error",
        "name": "ERC721InvalidSender"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "type": "error",
        "name": "ERC721NonexistentToken"
    },
    {
        "inputs": [],
        "type": "error",
        "name": "InvalidAccess"
    },
    {
        "inputs": [],
        "type": "error",
        "name": "InvalidParkName"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address",
                "indexed": true
            },
            {
                "internalType": "address",
                "name": "approved",
                "type": "address",
                "indexed": true
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256",
                "indexed": true
            }
        ],
        "type": "event",
        "name": "Approval",
        "anonymous": false
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address",
                "indexed": true
            },
            {
                "internalType": "address",
                "name": "operator",
                "type": "address",
                "indexed": true
            },
            {
                "internalType": "bool",
                "name": "approved",
                "type": "bool",
                "indexed": false
            }
        ],
        "type": "event",
        "name": "ApprovalForAll",
        "anonymous": false
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address",
                "indexed": true
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address",
                "indexed": true
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256",
                "indexed": true
            }
        ],
        "type": "event",
        "name": "Transfer",
        "anonymous": false
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "_to",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function",
        "name": "addBadge"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function",
        "name": "approve"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ]
    },
    {
        "inputs": [],
        "stateMutability": "view",
        "type": "function",
        "name": "currentTokenId",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ]
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "name": "getApproved",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ]
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "name": "getUserCollections",
        "outputs": [
            {
                "internalType": "struct Distributor.Park[]",
                "name": "",
                "type": "tuple[]",
                "components": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "imgUrl",
                        "type": "string"
                    }
                ]
            }
        ]
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "name": "isApprovedForAll",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ]
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "name": "isOperator",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ]
    },
    {
        "inputs": [],
        "stateMutability": "view",
        "type": "function",
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ]
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "name": "nationalParkBadges",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ]
    },
    {
        "inputs": [],
        "stateMutability": "view",
        "type": "function",
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ]
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "name": "ownerOf",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ]
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "name": "parks",
        "outputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "imgUrl",
                "type": "string"
            }
        ]
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function",
        "name": "safeTransferFrom"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function",
        "name": "safeTransferFrom"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function",
        "name": "setApprovalForAll"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_to",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "_isOperator",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function",
        "name": "setOperator"
    },
    {
        "inputs": [
            {
                "internalType": "bytes4",
                "name": "interfaceId",
                "type": "bytes4"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "name": "supportsInterface",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ]
    },
    {
        "inputs": [],
        "stateMutability": "view",
        "type": "function",
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ]
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "name": "tokenURI",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ]
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function",
        "name": "transferFrom"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_url",
                "type": "string"
            },
            {
                "internalType": "bool",
                "name": "isAdd",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function",
        "name": "updateParkUrl"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "name": "userCollections",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ]
    }
]

import { WalletConnectWallet, WalletConnectChainID } from '@tronweb3/walletconnect-tron';
import { log } from 'console'


export default function NoCapMaps() {

    const [tronWebFlag, setTronWebFlag] = useState<any>(null);  //<--- Puede que el issue este en esta variable confundida con instancia tronweb
    const [contract, setContract] = useState<any>(null);
    const [account, setAccount] = useState<string | null>(null);
    const [isContractDeployed, setIsContractDeployed] = useState<boolean>(false);
    const [isDeploying, setIsDeploying] = useState<boolean>(false);
    const [contractAddress, setContractAddress] = useState<string | null>('');



    const [wallet, setWallet] = useState(null)
    const [tokens, setTokens] = useState(0)
    const [activeTab, setActiveTab] = useState("explore")
    const [language, setLanguage] = useState("en")
    const [showTokenAnimation, setShowTokenAnimation] = useState(false)
    const { setTheme, theme } = useTheme()

    const [userLocation, setUserLocation] = useState({
        latitude: 0,
        longitude: 0
    });

    const [WalletAddress, setWalletAddress] = useState(""); 

    useEffect(() => {
        const initTronWeb = async () => {
            if (window.tronWeb && window.tronWeb.ready) {

                setWalletAddress(window.tronWeb.defaultAddress.base58);

                setAccount(window.tronWeb.defaultAddress.base58);
                setTronWebFlag(true);
                const acc = await window.tronWeb.trx.getAccount();


                console.log(WalletAddress);

            }
        };

        initTronWeb();

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                setUserLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            })
        }
    }, [])



    const handleConnect = async () => {
        const walletInfo = await connectWallet()
    }
    const handleCheckIn = async () => {
        try {
 
            // let contract = await window.tronWeb.contract(ABI, "TY23UMNXJkWmFtCm7BY7NSTeWyVv93N5vC");
            let contract = await window.tronWeb.contract(ABI, "TYTGSRB2uinkZ5WUm1nQcbBEh4Qcyxxoxy");
            
            console.log(WalletAddress);

            let txID = await contract.addBadge("yellowstone", WalletAddress).send();
    
            let result = await window.tronWeb.trx.getTransaction(txID);
            console.log('Royalties distributed:', result);
            alert('Get NFT successfully');
        } catch (error) {
            console.error('Failed to distribute royalties:', error);
            alert('Failed to distribute royalties. Please check the console for details.');
        }
    }
    const [result, setResult] = useState<{ name: string; image: string }[]>([]); // 用于保存NFT列表

    const viewNFT = async () => {
        try {


            // let contract = await window.tronWeb.contract(ABI, "TY23UMNXJkWmFtCm7BY7NSTeWyVv93N5vC"); //testnet
            let contract = await window.tronWeb.contract(ABI, "TYTGSRB2uinkZ5WUm1nQcbBEh4Qcyxxoxy"); //mainnet
            let result = await contract.getUserCollections(WalletAddress).call();
            
            const nftList = result.map(item => ({
                name: item[0],
                image: item[1]
            }));

            setResult(nftList);

            alert('Get NFT lists successfully');
        } catch (error) {
            console.error('Failed to distribute royalties:', error);
            alert('Failed to distribute royalties. Please check the console for details.');
        }
    }


    const toggleLanguage = () => {
        setLanguage(prev => prev === "en" ? "zh" : "en")
    }




    const t = (key) => {
        const translations = {
            en: {
                explore: "Explore",
                collection: "Collection",
                invite: "Invite",
                connectWallet: "Connect Wallet",
                checkIn: "Check In Here",
                earnedTokens: "You earned 10 PKG!",
                inviteLink: "Share Invite Link",
                nftCollection: "Your NFT Collection",
                friendInvite: "Invite Friends",
                inviteDesc: "Invite friends to check in together and earn more",
                viewNFT: "View NFT Collection"
            },
            zh: {
                explore: "探索",
                collection: "收藏",
                invite: "邀请",
                connectWallet: "连接钱包",
                checkIn: "在此打卡",
                earnedTokens: "你获得了10 PKG！",
                inviteLink: "分享邀请链接",
                nftCollection: "你的NFT收藏",
                friendInvite: "邀请好友",
                inviteDesc: "邀请好友一起打卡，赚取额外PKG！",
            }
        }
        return translations[language][key]
    }

    const connectWallet = async () => {
        if (window.tronWeb) {
            try {
                await window.tronWeb.request({ method: 'tron_requestAccounts' });
                const acc = await window.tronWeb.trx.getAccount();
                setAccount(window.tronWeb.defaultAddress.base58);
            } catch (error) {
                console.error('Failed to connect wallet:', error);
            }
        } else {
            alert('Please install TronLink extension');
        }
    };


    return (
        <div className={`min-h-screen flex flex-col justify-between ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gradient-to-r from-cyan-800 to-teal-800 text-white'}`}>
            <header className="flex justify-between items-center p-4 bg-opacity-90 backdrop-blur-md">
                <div className="flex items-center space-x-2">


                    <Button variant="secondary" onClick={connectWallet}>
                        {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
                    </Button>
                </div>
            </header>

            {/* Logo*/}
            <div className="flex flex-col items-center mt-2 mb-4">
                <TreePine className="h-32 w-32" />
                <h1 className="text-4xl font-bold">NoCapMaps</h1>
            </div>

            {/* Navbar */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex-grow">
                <TabsList className="m-4 px-4 w-auto grid grid-cols-3 p-1 bg-white rounded-lg shadow-md">
                    <TabsTrigger value="explore" className="data-[state=active]:bg-teal-800 data-[state=active]:text-white">
                        {t('explore')}
                    </TabsTrigger>
                    <TabsTrigger value="collection" className="data-[state=active]:bg-teal-800 data-[state=active]:text-white">
                        {t('collection')}
                    </TabsTrigger>
                    <TabsTrigger value="invite" className="data-[state=active]:bg-teal-800 data-[state=active]:text-white">
                        {t('invite')}
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="explore">
                    <Card className="m-4 flex-grow">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span>{t('explore')}</span>
                            </CardTitle>
                            <CardDescription>Discover and check-in at beautiful parks</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className={`h-64 rounded-lg flex items-center justify-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
                                <MapPin className="w-12 h-12 text-teal-800" />
                                <span className="ml-2 text-lg">Map View</span>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col items-center">
                            <Button className="w-full mb-2 bg-teal-800 hover:bg-teal-700" onClick={handleCheckIn}>{t('checkIn')}</Button>
                            <AnimatePresence>
                                {showTokenAnimation && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="text-teal-800 font-bold text-lg"
                                    >
                                        {t('earnedTokens')}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="collection">
                    <Card className="m-4 flex-grow">
                        <CardHeader>
                            <CardTitle>{t('nftCollection')}</CardTitle>
                        </CardHeader>
                        <Button className="m-4 w-auto bg-teal-800 hover:bg-teal-700 shadow-md" onClick={viewNFT}>{t('viewNFT')}</Button>

                        <CardContent>
                            <div className="grid grid-cols-3 gap-4">
                                {result.map((item, index) => (
                                    <div key={index} className={`rounded-lg p-4 flex flex-col items-center justify-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'} transition duration-300 transform hover:scale-105`}>
                                        <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-full mb-2" />
                                        <span className="text-lg font-semibold text-center">{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="invite">
                    <Card className="m-4 flex-grow">
                        <CardHeader>
                            <CardTitle>{t('friendInvite')}</CardTitle>
                            <CardDescription>{t('inviteDesc')}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full bg-teal-800 hover:bg-teal-700  shadow-md" onClick={() => alert('Your Link is: http://nocapmaps.invite?id=TVwxdmZRp42J2wxABkbqENc1D8YNSVyAhh')}>
                                {t('inviteLink')}
                            </Button>

                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <footer className="p-4 bg-opacity-90 backdrop-blur-md text-center">
                <span>© 2024 NoCapMaps. All Rights Reserved.</span>
            </footer>
        </div>
    )
}