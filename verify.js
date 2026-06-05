const devices = new Set();

export default async function handler(req,res){

if(req.method !== "POST"){
    return res.status(405).json({
        status:"fail",
        message:"Method Not Allowed"
    });
}

const { fingerprint } = req.body;

if(!fingerprint){
    return res.status(400).json({
        status:"fail",
        message:"Verification Failed"
    });
}

if(devices.has(fingerprint)){
    return res.status(200).json({
        status:"fail",
        message:"Device already used"
    });
}

devices.add(fingerprint);

return res.status(200).json({
    status:"pass",
    message:"Verified Successfully"
});

}
