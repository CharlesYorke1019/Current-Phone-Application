const settingPlayerPositions = (rS) => {
    let inGamePlayerPositions = [];

    if (rS === 2) {
        let p1 = {
            pTop: '79%',
            pLeft: '10%'
        }
        let p2 = {
            pTop: '17%',
            pLeft: '10%'
        }

        inGamePlayerPositions.push(p1, p2)
    } else if (rS === 3) {
        let p1 = {
            pTop: '79%',
            pLeft: '10%'
        }
        let p2 = {
            pTop: '48%',
            pLeft: '-20%'
        }
        let p3 = {
            pTop: '48%',
            pLeft: '40%'
        }

        inGamePlayerPositions.push(p1, p2, p3)
    } else if (rS === 4) {
        let p1 = {
            pTop: '79%',
            pLeft: '10%'
        }
        let p2 = {
            pTop: '48%',
            pLeft: '-20%'
        }
        let p3 = {
            pTop: '17%',
            pLeft: '10%'
        }
        let p4 = {
            pTop: '48%',
            pLeft: '40%'
        }

        inGamePlayerPositions.push(p1, p2, p3, p4)
    } else if (rS === 5) {

        let p1 = {
            pTop: '79%',
            pLeft: '10%'
        }

        let p2 = {
            pTop: '57%',
            pLeft: '-20%'
        }

        let p3 = {
            pTop: '33%',
            pLeft: '-20%'
        }

        let p4 = {
            pTop: '33%',
            pLeft: '40%'
        }

        let p5 = {
            pTop: '57%',
            pLeft: '40%'
        }


        inGamePlayerPositions.push(p1, p2, p3, p4, p5)
    } else if (rS === 6) {

        let p1 = {
            pTop: '79%',
            pLeft: '10%'
        }

        let p2 = {
            pTop: '61%',
            pLeft: '-20%'
        }

        let p3 = {
            pTop: '37%',
            pLeft: '-20%'
        }

        let p4 = {
            pTop: '17%',
            pLeft: '10%'
        }

        let p5 = {
            pTop: '37%',
            pLeft: '40%'
        }

        let p6 = {
            pTop: '61%',
            pLeft: '40%'
        }

        inGamePlayerPositions.push(p1, p2, p3, p4, p5, p6)
    } else if (rS === 7) {

        let p1 = {
            pTop: '79%',
            pLeft: '10%'
        }

        let p2 = {
            pTop: '61%',
            pLeft: '-20%'
        }

        let p3 = {
            pTop: '42%',
            pLeft: '-20%'
        }

        let p4 = {
            pTop: '20.5%',
            pLeft: '-15%'
        }

        let p5 = {
            pTop: '20.5%',
            pLeft: '35%'
        }

        let p6 = {
            pTop: '42%',
            pLeft: '40%'
        }

        let p7 = {
            pTop: '61%',
            pLeft: '40%'
        }

        inGamePlayerPositions.push(p1, p2, p3, p4, p5, p6, p7)
    } else if (rS === 8) {
        
        let p1 = {
            pTop: '79%',
            pLeft: '10%'
        }

        let p2 = {
            pTop: '66%',
            pLeft: '-20%'
        }

        let p3 = {
            pTop: '48%',
            pLeft: '-20%'
        }

        let p4 = {
            pTop: '30%',
            pLeft: '-20%'
        }

        let p5 = {
            pTop: '17%',
            pLeft: '10%'        
        }

        let p6 = {
            pTop: '30%',
            pLeft: '40%'
        }

        let p7 = {
            pTop: '48%',
            pLeft: '40%'
        }

        let p8 = {
            pTop: '66%',
            pLeft: '40%'
        }

        inGamePlayerPositions.push(p1, p2, p3, p4, p5, p6, p7, p8)

    } else if (rS === 9) {
        
        let p1 = {
            pTop: '79%',
            pLeft: '10%'
        }

        let p2 = {
            pTop: '66%',
            pLeft: '-15%'
        }

        let p3 = {
            pTop: '51%',
            pLeft: '-20%'
        }

        let p4 = {
            pTop: '36%',
            pLeft: '-15%'
        }

        let p5 = {
            pTop: '19%',
            pLeft: '-8%'
        }

        let p6 = {
            pTop: '19%',
            pLeft: '28%'
        }

        let p7 = {
            pTop: '36%',
            pLeft: '35%'
        }

        let p8 = {
            pTop: '51%',
            pLeft: '40%'
        }

        let p9 = {
            pTop: '66%',
            pLeft: '35%'
        }

        inGamePlayerPositions.push(p1, p2, p3, p4, p5, p6, p7, p8, p9)

    }

    return inGamePlayerPositions;
}

export default settingPlayerPositions




