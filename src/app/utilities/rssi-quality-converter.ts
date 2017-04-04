export function dbmToQuality(dBm: number):number {
    var quality: number = 0;
    if (dBm <= -100)
        quality = 0;
    else if (dBm >= -50)
        quality = 100;
    else
        quality = 2 * (dBm + 100);

    // Quality to dBm:
    if (quality <= 0)
        dBm = -100;
    else if (quality >= 100)
        dBm = -50;
    else
        dBm = (quality / 2) - 100;
    return quality;
}