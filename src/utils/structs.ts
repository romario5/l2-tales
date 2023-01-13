import Earcut from "./Earcut";

export class Point
{
    x : number = 0;
    y : number = 0;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}


export class Line
{
    p1 : Point;
    p2 : Point;

    constructor(p1 : Point, p2 : Point) {
        this.p1 = p1;
        this.p2 = p2;
    }
}


export class Triangle
{
    p1 : Point;
    p2 : Point;
    p3 : Point;

    constructor(p1 : Point, p2 : Point, p3 : Point) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
    }

    isPointInside(p : Point) : boolean {
        return false;
    }
}


export class Polygon
{
    triangles : Triangle[]
    points    : Point[]
    width     : number
    height    : number

    constructor(points : Point[] | undefined) {
        if (points !== undefined) {
            this.setPoints(points)
        } else {
            this.triangles = []
            this.points = []
        }
    }


    setPoints(points : Point[]) {
        this.points = points
        this.triangulate();
    }


    triangulate() {
        let points : number[] = []
        for (let i = 0; i < this.points.length; i++) {
            points.push(this.points[i].x, this.points[i].y);
        }
        let tp : number[] = Earcut.triangulate(points, [], 2);
        this.triangles = []
        for (let i = 0; i < tp.length; i += 3) {
            if (i < points.length) {
                this.triangles.push(new Triangle(this.points[i], this.points[i+1], this.points[i+2]));
            }
        }
    }

    getPointsArray() : number[] {
        let data : number[] = [];
        for (let i = 0; i < this.points.length; i++) {
            data.push(this.points[i].x, this.points[i].y);
        }
        return data;
    }
}