const store = {}; // simple memory DB

export default function handler(req, res) {

const { fp } = req.body;

if (!fp) {
return res.json({
status: "fail",
message: "Fingerprint Missing"
});
}

// SAME DEVICE CHECK
if (store[fp]) {
return res.json({
status: "fail",
message: "Device already used"
});
}

// SAVE DEVICE
store[fp] = true;

return res.json({
status: "pass",
message: "Verified Successfully"
});

}
