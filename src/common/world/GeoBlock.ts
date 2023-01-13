enum GeoBlock
{
    N = 0x02,
    S = 0x04,
    W = 0x08,
    E = 0x16,

    NSWE = N | S | W | E
}

export default GeoBlock