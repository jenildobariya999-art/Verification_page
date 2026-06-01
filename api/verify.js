export default async function handler(req,res){

    const { webhook } = req.body;

    const payload = {
        results:{
            user_hash:
                "USER_" + Math.random().toString(36),
            captcha:"ok",
            vpn:"no"
        }
    };

    try{

        await fetch(webhook,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(payload)
        });

        return res.status(200).json({
            success:true
        });

    }catch(e){

        return res.status(500).json({
            success:false
        });
    }
}
