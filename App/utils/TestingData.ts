export const IEO_data : Array<{ id: string, banner: string, currencyName: string, status: string, desc: string, free: string, links: Array<string>, socialMediaLinks: Array<string> }> = [
    { 
        id: "1", 
        currencyName: "XDC", 
        banner: "XDC BANNNER",
        status: "available",
        desc: "XDC description",
        free: "XDC free text",
        links: [
            "XDC project link",
        ],
        socialMediaLinks: [
            "XDC social link",
        ],            
    },
    { 
        id: "2", 
        currencyName: "GBEX", 
        banner: "GBEX BANNNER",
        status: "completed",
        desc: "GBEX description",
        free: "GBEX free text",
        links: [
            "GBEX project link 1",
            "GBEX project link 2",
        ],
        socialMediaLinks: [
            "GBEX social link 1",
            "GBEX social link 2",
        ],    
    },
];
export const IEO_images : Array<{ currencyName: string, uri: string }> = [
    { currencyName: "XDC", uri: "https://api.globiance.com/api/assets/wallet/XDC.png", },
    { currencyName: "GBEX", uri: "https://api.globiance.com/api/assets/wallet/GBEX.png" },
    { currencyName: "EUR", uri: "https://api.globiance.com/api/assets/wallet/EUR.png", },
    { currencyName: "ETH", uri: "https://api.globiance.com/api/assets/wallet/ETH.png", },
]