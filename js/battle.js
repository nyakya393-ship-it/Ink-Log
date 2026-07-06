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
// Validation
// ======================================

function validateBattle(){

    if(!battleDate.value){

        UI.showToast("日付を入力してください","error");

        battleDate.focus();

        return false;

    }

    if(!battleWeapon.value){

        UI.showToast("ブキを選択してください","error");

        battleWeapon.focus();

        return false;

    }

    if(!battleStage.value){

        UI.showToast("ステージを選択してください","error");

        battleStage.focus();

        return false;

    }

    if(!battleRule.value){

        UI.showToast("ルールを選択してください","error");

        battleRule.focus();

        return false;

    }

    return true;

}
// ======================================
// Save Battle
// ======================================

async function saveBattle(){
    if(!validateBattle()){

    return;

}

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
// Delete Battle
// ======================================

async function deleteBattle(id){

    const ok=await UI.confirmDialog(

        "この戦績を削除しますか？"

    );

    if(!ok){

        return;

    }

    await Storage.deleteBattle(id);

    UI.showToast(

        "戦績を削除しました"

    );

    renderBattleList();

}
// ======================================
// Favorite
// ======================================

async function toggleFavorite(id){

    const battles=

        await Storage.getBattles();

    const battle=

        battles.find(

            b=>b.id===id

        );

    if(!battle){

        return;

    }

    battle.favorite=

        !battle.favorite;

    await Storage.updateBattle(

        battle

    );

    renderBattleList();

}
// ======================================
// Battle List
// ======================================

async function renderBattleList(){

    const list=

        document.getElementById(

            "battleList"

        );

    if(!list){

        return;

    }

    list.innerHTML="";

    const battles=

        await Storage.getBattles();

    battles.reverse().forEach(

        battle=>{

            const card=

                document.createElement("div");

            card.className=

                "battleCard";

            card.innerHTML=`

                <h3>

                    ${battle.weapon}

                </h3>

                <p>

                    ${battle.stage}

                </p>

                <p>

                    ${battle.result}

                </p>

                <div class="battleButtons">

                    <button

                        onclick="loadBattle('${battle.id}')">

                        編集

                    </button>

                    <button

                        onclick="toggleFavorite('${battle.id}')">

                        ⭐

                    </button>

                    <button

                        onclick="deleteBattle('${battle.id}')">

                        削除

                    </button>

                </div>

            `;

            list.appendChild(

                card

            );

        }

    );

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
// Image Preview
// ======================================

const imageInput=document.getElementById("battleImages");

const preview=document.getElementById("imagePreviewList");

if(imageInput){

    imageInput.addEventListener("change",()=>{

        preview.innerHTML="";

        [...imageInput.files].forEach(file=>{

            const img=document.createElement("img");

            img.src=URL.createObjectURL(file);

            img.className="previewImage";

            preview.appendChild(img);

        });

    });

}
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
// ======================================
// History Filter
// ======================================

function getFilteredBattles(list){

    const keyword=

        historySearch.value

        .toLowerCase();

    const filter=

        historyFilter.value;

    const sort=

        historySort.value;

    let battles=[...list];

    if(keyword){

        battles=battles.filter(

            b=>

            b.weapon.toLowerCase().includes(keyword)

            ||

            b.stage.toLowerCase().includes(keyword)

        );

    }

    if(filter==="WIN"){

        battles=battles.filter(

            b=>b.result==="WIN"

        );

    }

    if(filter==="LOSE"){

        battles=battles.filter(

            b=>b.result==="LOSE"

        );

    }

    if(filter==="favorite"){

        battles=battles.filter(

            b=>b.favorite

        );

    }

    if(sort==="new"){

        battles.reverse();

    }

    return battles;

}
