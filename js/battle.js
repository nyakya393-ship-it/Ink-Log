// ======================================
// Edit Mode
// ======================================

let editingId = null;
// ======================================
// Battle Data Template
// ======================================

function createBattleData(){

    return{

        id:Utils.createId(),

        date:"",

        time:"",

        season:"",

        mode:"",

        rule:"",

        stage:"",

        weapon:"",

        weaponImage:"",

        sub:"",

        subImage:"",

        special:"",

        specialImage:"",

        result:"",

        knockout:false,

        rank:"",

        xp:0,

        kill:0,

        assist:0,

        death:0,

        specialCount:0,

        paint:0,

        medal1:"",

        medal2:"",

        medal3:"",

        gearHead:"",

        gearClothes:"",

        gearShoes:"",

        ticket:"",

        food:"",

        drink:"",

        image:"",

        favorite:false,

        note:"",

        createdAt:new Date().toISOString()

    };

}

// ======================================
// Preview Update
// ======================================

function updateWeapon(){

    const weapon=weapons[weaponSelect.value];

    if(!weapon)return;

    weaponPreview.src=weapon.image;

    subPreview.src=weapon.subImage;

    specialPreview.src=weapon.specialImage;

    subSelect.innerHTML=
        `<option>${weapon.sub}</option>`;

    specialSelect.innerHTML=
        `<option>${weapon.special}</option>`;

}

function updateStage(){

    const stage=stages[stageSelect.value];

    if(!stage)return;

    stagePreview.src=stage.image;

}

// ======================================
// K/D
// ======================================

function updateKD(){

    const kill=
        Number(
            document.getElementById("battleKill").value
        );

    const death=
        Number(
            document.getElementById("battleDeath").value
        );

    const kd=
        document.getElementById("battleKD");

    if(death===0){

        kd.value=kill.toFixed(2);

    }

    else{

        kd.value=(kill/death).toFixed(2);

    }

}

// ======================================
// Event
// ======================================

weaponSelect.addEventListener(

    "change",

    updateWeapon

);

stageSelect.addEventListener(

    "change",

    updateStage

);

document.getElementById("battleKill")
.addEventListener(

    "input",

    updateKD

);

document.getElementById("battleDeath")
.addEventListener(

    "input",

    updateKD

);

// ======================================
// Start
// ======================================

window.addEventListener(

    "load",

    ()=>{

        loadWeapons();

        loadStages();

        updateKD();

    }

);
// ======================================
// Save Battle
// ======================================

async function saveBattle(){

    const battle={

        id:editingId ?? Utils.createId(),

        date:document.getElementById("battleDate").value,

        time:document.getElementById("battleTime").value,

        mode:document.getElementById("battleMode").value,

        rule:document.getElementById("battleRule").value,

        stage:document.getElementById("battleStage").value,

        weapon:document.getElementById("battleWeapon").value,

        sub:document.getElementById("battleSub").value,

        special:document.getElementById("battleSpecial").value,

        result:getSelectedResult(),

        kill:Number(document.getElementById("battleKill").value),

        assist:Number(document.getElementById("battleAssist").value),

        death:Number(document.getElementById("battleDeath").value),

        specialCount:Number(document.getElementById("battleSpecialCount").value),

        paint:Number(document.getElementById("battlePaint").value),

        xp:Number(document.getElementById("battleXP").value),

        rank:document.getElementById("battleRank").value,

        knockout:document.getElementById("battleKnockout").value==="true",

        memo:document.getElementById("battleMemo").value,

        favorite:document.getElementById("battleFavorite").checked,

        createdAt:new Date().toISOString()

    };

    if(editingId){

    await Storage.updateBattle(battle);

    UI.showToast("戦績を更新しました");

}else{

    await Storage.saveBattle(battle);

    UI.showToast("戦績を保存しました");

}
    document.getElementById("battleForm").reset();

    editingId=null;
}
// ======================================
// Result
// ======================================

let selectedResult="WIN";

function getSelectedResult(){

    return selectedResult;

}

document.querySelectorAll(".resultButton")

.forEach(button=>{

    button.addEventListener("click",()=>{

        document

        .querySelectorAll(".resultButton")

        .forEach(b=>{

            b.classList.remove("active");

        });

        button.classList.add("active");

        selectedResult=

            button.dataset.result;

    });

});
// ======================================
// Form Submit
// ======================================

document

.getElementById("battleForm")

.addEventListener(

"submit",

async e=>{

    e.preventDefault();

    await saveBattle();

}

);
// ======================================
// Load Battle
// ======================================

async function loadBattle(id){

    const battles = await Storage.getBattles();

    const battle = battles.find(

        b=>b.id===id

    );

    if(!battle){

        return;

    }

    editingId=id;

    battleDate.value=battle.date;

    battleTime.value=battle.time;

    battleMode.value=battle.mode;

    battleRule.value=battle.rule;

    battleStage.value=battle.stage;

    battleWeapon.value=battle.weapon;

    battleSub.value=battle.sub;

    battleSpecial.value=battle.special;

    battleKill.value=battle.kill;

    battleAssist.value=battle.assist;

    battleDeath.value=battle.death;

    battleSpecialCount.value=battle.specialCount;

    battlePaint.value=battle.paint;

    battleXP.value=battle.xp;

    battleRank.value=battle.rank;

    battleKnockout.value=String(battle.knockout);

    battleMemo.value=battle.memo;

    battleFavorite.checked=battle.favorite;

    updateWeapon();

    updateStage();

    updateKD();

}
