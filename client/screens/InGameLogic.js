import { socket } from "../socket"

const signalRE = (socket) => {
    socket.emit('currentRoundHasEnded')
}

export const inGameLogic4Players = {
    theBB4: (spaces1, setTurnCB, socket, ...args1) => {
        if (spaces1 === 1) {
            if (!args1[1]) {
                signalRE(socket)
                setTurnCB(args1[0]);
            } 
            
            if (args1[1]) {
                signalRE(socket)
                setTurnCB(args1[2]);
            }



        } else if (spaces1 === 2) {
            if (!args1[1]) {
                setTurnCB(args1[0]);
            }

            if (args1[1]) {
                signalRE(socket)
                setTurnCB(args1[2]);
            } 

            if (args1[3] && args1[4]) {
                if (args1[1] && args1[3]) {
                    signalRE(socket)
                    setTurnCB(args1[4]);                   
                }
            }
            
        } else if (spaces1 === 3) {
            if (!args1[1]) {
                setTurnCB(args1[0]);
            }
            
            if (args1[1]) {
                setTurnCB(args1[2]);
            }

            if (args1[3] && args1[4]) {
                if (args1[1] && args1[3]) {
                    signalRE(socket)
                    setTurnCB(args1[4]);
                }
            }
            
        }
    },

    theSB4: (spaces2, setTurnCB, socket, ...args2) => {
        if (spaces2 === 1) {
            signalRE(socket)
            setTurnCB(args2[0])
    
        } else if (spaces2 === 2) {
            if (!args2[1]) {
                setTurnCB(args2[0])
            }

            if (args2[1]) {
                signalRE(socket)
                setTurnCB(args2[2])
            }
            
        } else if (spaces2 === 3) {
            if (!args2[1]) {
                setTurnCB(args2[0])
            }

            if (args2[1]) {
                setTurnCB(args2[2])
            }

            if (args2[3] && args2[4]) {
                if (args2[1] && args2[3]) {
                    signalRE(socket)
                    setTurnCB(args2[4])
                }
            } 
        }
    },

    pNext2TheBB4: (spaces3, setTurnCB, socket, ...args3) => {
        if (spaces3 === 1) {
            if (!args3[1]) {
                setTurnCB(args3[0])
            }

            if (args3[1]) {
                signalRE(socket)
                setTurnCB(args3[2])
            }

            if (args3[3] && args3[4]) {
                if (args3[1] && args3[3]) {
                    signalRE(socket)
                    setTurnCB(args3[4])
                }
            }

        } else if (spaces3 === 2) {
            if (!args3[1]) {
                setTurnCB(args3[0])
            }

            if (args3[1]) {
                signalRE(socket)
                setTurnCB(args3[2])
            }
            
        } else if (spaces3 === 3) {
            if (!args3[1]) {
                setTurnCB(args3[0])
            }

            if (args3[1]) {
                setTurnCB(args3[2])
            }

            if (args3[3] && args3[4]) {
                if (args3[1] && args3[3]) {
                    signalRE(socket)
                    setTurnCB(args3[4])
                }
            }

            
        }
    
    },

    p2SpotsFromBB4: (spaces4, setTurnCB, socket, ...args4) => {
            
        if (spaces4 === 1) {
            signalRE(socket)
            setTurnCB(args4[0]);
            
        } else if (spaces4 === 2) {
            if (!args4[1]) {
                setTurnCB(args4[0]);
            }

            if (args4[1]) {
                signalRE(socket)
                setTurnCB(args4[2]);
            }
            
        } else if (spaces4 === 3) {
            if (!args4[1]) {
                setTurnCB(args4[0]);
            }

            if (args4[1]) {
                setTurnCB(args4[2]);
            }

            if (args4[3] && args4[4]) {
                if (args4[1] && args4[3]) {
                    signalRE(socket)
                    setTurnCB(args4[4]);
                }
            }
            
        }
        
    },

    pBettingOrRaising4: (setTurnCB, socket, ...a) => {
        
        if (!a[1]) {
            setTurnCB(a[0])
        } 
        
        if (a[1]) {
            setTurnCB(a[2])
        } 
        
        if (a[1] && a[3]) {
            setTurnCB(a[4])
        }

        signalRE(socket)

    
        
    },

    pChecking4: (spaces5, setTurnCB, currentRound, socket, ...args5) => {
        if (spaces5 === 0) {
            if (!args5[1]) {
                setTurnCB(args5[0])
            }

            if (args5[1]) {
                setTurnCB(args5[2])
            }

            if (args5[1] && args5[3]) {
                setTurnCB(args5[4])
            }
            
        } else if (spaces5 === 1) {
            if (!args5[1]) {
                signalRE(socket)
                setTurnCB(args5[0])
            }

            if (args5[1]) {
                signalRE(socket)                
                setTurnCB(args5[2])
            }

            if (args5[1] && args5[3]) {
                setTurnCB(args5[4])
            }
            
        } else if (spaces5 === 2) {
            if (!args5[1]) {
                setTurnCB(args5[0])
            }

            if (args5[1]) {
                signalRE(socket)
                setTurnCB(args5[2])
            }

            if (args5[1] && args5[3]) {
                setTurnCB(args5[4])
            }
            
        } else if (spaces5 === 3) {
            if (currentRound === 0) {

                if (!args5[1]) {
                    signalRE(socket)
                    setTurnCB(args5[0]);
                } 
                if (args5[1]) {
                    signalRE(socket)
                    setTurnCB(args5[2])
                }

            } else if (currentRound === 1) {
                if (args5[4]) {
                    setTurnCB(args5[3])
                }

                if (args5[4]) {
                    setTurnCB(args5[5])
                }

                if (args5[4] && args5[6]) {
                    signalRE(socket)
                    setTurnCB(args5[7])
                }
            }
        }
    
    },
}