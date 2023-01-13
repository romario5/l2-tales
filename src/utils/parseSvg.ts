export default function(svgData : string) : string {
    let parser = new DOMParser()
    let doc = parser.parseFromString(svgData, "application/xml")
    let paths = doc.getElementsByTagName("path")

    let result : {[key : string] : {id: string, name: string, polygons : {x: number, y: number}[][]}} = {}

    for (let i = 0; i < paths.length; i++) {
        let id = paths[i].getAttribute('id')
        let name = paths[i].getAttribute('name')
        let d = paths[i].getAttribute('d')
            .replace('z', '')
            .replace('Z', '')
            .replace(/\s\s/g, ' ')

        let isM = d.indexOf('M') >= 0
        let isL = d.indexOf('l') >= 0
        if (isM) d = d.slice(1).trim()
        if (isL) d = d.replace('l', ' ').replace(/\s\s/g, ' ')


        d = d.replace(/-/g, ' -')
        let points = d.split(/\s/)

        if (id === null || id === undefined) {
            id = name;
        }

        if (!result.hasOwnProperty(id)) {
            result[id] = {
                id: id,
                name: name,
                polygons: []
            }
        }

        if (id === 'UA') console.log(d)
        if (id === 'UA') console.log(points)
        let polygon = []
        let p = []
        for (let j = 0; j < points.length; j++) {
            let n = parseFloat(points[j])
            if (n !== null && !isNaN(n)) {
                p.push(n)
            } else {
                //console.error('Can not parse point', id, points[j])
            }
        }

        if (id === 'UA') console.log(p)

        if (isL) {
            let x = p[0]
            let y = p[1]
            polygon.push({x: x, y: y})
            for (let j = 2; j+1 < p.length; j += 2) {
                x += p[j]
                y += p[j+1]
                polygon.push({x: x, y: y})

            }
        } else {
            for (let j = 0; j+1 < p.length; j += 2) {
                polygon.push({x: p[j], y: p[j+1]})
            }
        }

        result[id].polygons.push(polygon)
    }

    return JSON.stringify(result);
}

