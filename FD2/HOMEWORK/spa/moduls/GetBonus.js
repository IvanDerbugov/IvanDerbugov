export function renderGetBonus() {
return `
<p class="timer"><span id="minBonus">00</span>:<span id="secBonus">00</span></p>
<p data-translate="Забрать бонус">Забрать бонус</p>
<svg class="diamond-svg" width="50px" height="50px" viewBox="0 0 48 48">
    <path d="M1,18.42L22.46,44.16a2,2,0,0,0,3.07,0L47,18.42H1Z" fill="#299acc" />
    <path d="M36.6,3.42H11.4A4,4,0,0,0,7.87,5.53L1,18.42H47L40.13,5.53A4,4,0,0,0,36.6,3.42Z" fill="#38b1e7" />
    <path d="M22.08,43.38L15,18.42H33l-7.08,25A2,2,0,0,1,22.08,43.38Z" fill="#61c0ea" />
    <polygon points="33 18.42 15 18.42 14 3.42 34 3.42 33 18.42" fill="#89d0ef" />
</svg>
`;
}