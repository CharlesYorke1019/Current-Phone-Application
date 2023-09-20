const settingPlayerPositions = (rS) => {
    let inGamePlayerPositions = [];

    if (rS === 2) {
        let p1 = {
            pTop: 652,
            pLeft: 38
        }
        let p2 = {
            pTop: 135,
            pLeft: 38
        }

        inGamePlayerPositions.push(p1, p2)
    } else if (rS === 3) {
        let p1 = {
            pTop: 652,
            pLeft: 38
        }
        let p2 = {
            pTop: 390,
            pLeft: 140
        }
        let p3 = {
            pTop: 390,
            pLeft: -60
        }

        inGamePlayerPositions.push(p1, p2, p3)
    } else if (rS === 4) {
        let p1 = {
            pTop: 652,
            pLeft: 38
        }
        let p2 = {
            pTop: 390,
            pLeft: -60
        }
        let p3 = {
            pTop: 135,
            pLeft: 38
        }
        let p4 = {
            pTop: 390,
            pLeft: 140
        }

        inGamePlayerPositions.push(p1, p2, p3, p4)
    } else if (rS === 5) {

        let p1 = {
            pTop: 652,
            pLeft: 38
        }

        let p2 = {
            pTop: 470,
            pLeft: -60
        }

        let p3 = {
            pTop: 270,
            pLeft: -60
        }

        let p4 = {
            pTop: 270,
            pLeft: 140
        }

        let p5 = {
            pTop: 470,
            pLeft: 140
        }


        inGamePlayerPositions.push(p1, p2, p3, p4, p5)
    } else if (rS === 6) {

        let p1 = {
            pTop: 652,
            pLeft: 38
        }

        let p2 = {
            pTop: 500,
            pLeft: -60
        }

        let p3 = {
            pTop: 300,
            pLeft: -60
        }

        let p4 = {
            pTop: 135,
            pLeft: 38
        }

        let p5 = {
            pTop: 300,
            pLeft: 140
        }

        let p6 = {
            pTop: 500,
            pLeft: 140
        }

        inGamePlayerPositions.push(p1, p2, p3, p4, p5, p6)
    } else if (rS === 7) {

        let p1 = {
            pTop: 652,
            pLeft: 38
        }

        let p2 = {
            pTop: 500,
            pLeft: -60
        }

        let p3 = {
            pTop: 350,
            pLeft: -60
        }

        let p4 = {
            pTop: 170,
            pLeft: -50
        }

        let p5 = {
            pTop: 170,
            pLeft: 130
        }

        let p6 = {
            pTop: 350,
            pLeft: 140
        }

        let p7 = {
            pTop: 500,
            pLeft: 140
        }

        inGamePlayerPositions.push(p1, p2, p3, p4, p5, p6, p7)
    } else if (rS === 8) {
        
        let p1 = {
            pTop: 652,
            pLeft: 38
        }

        let p2 = {
            pTop: 550,
            pLeft: -60
        }

        let p3 = {
            pTop: 400,
            pLeft: -60
        }

        let p4 = {
            pTop: 250,
            pLeft: -60
        }

        let p5 = {
            pTop: 135,
            pLeft: 38        
        }

        let p6 = {
            pTop: 250,
            pLeft: 140
        }

        let p7 = {
            pTop: 400,
            pLeft: 140
        }

        let p8 = {
            pTop: 550,
            pLeft: 140
        }

        inGamePlayerPositions.push(p1, p2, p3, p4, p5, p6, p7, p8)

    } else if (rS === 9) {
        
        let p1 = {
            pTop: 652,
            pLeft: 38
        }

        let p2 = {
            pTop: 550,
            pLeft: -60
        }

        let p3 = {
            pTop: 420,
            pLeft: -60
        }

        let p4 = {
            pTop: 290,
            pLeft: -60
        }

        let p5 = {
            pTop: 155,
            pLeft: -50
        }

        let p6 = {
            pTop: 155,
            pLeft: 130
        }

        let p7 = {
            pTop: 290,
            pLeft: 140
        }

        let p8 = {
            pTop: 420,
            pLeft: 140
        }

        let p9 = {
            pTop: 550,
            pLeft: 140
        }

        inGamePlayerPositions.push(p1, p2, p3, p4, p5, p6, p7, p8, p9)

    }

    return inGamePlayerPositions;
}

export default settingPlayerPositions




