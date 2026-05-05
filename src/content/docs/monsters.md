---
title: "Nevergrind Online 怪物分類與特性（Traits）指南"
description: "Nevergrind Online 的怪物不能只看血量。進地城後先讀怪物名字顏色、背景顏色、職業圖示、species / type 與 traits，才能判斷這場戰鬥該先控誰、先殺誰、誰能放著給 tank 扛，誰會把隊伍資源直接抽乾。"
sourcePages: []
reviewedAt: "2026-05-03"
sourceLastModified: "N/A"
status: "整理改寫"
---

Nevergrind Online 的怪物不能只看血量。進地城後先讀怪物名字顏色、背景顏色、職業圖示、species / type 與 traits，才能判斷這場戰鬥該先控誰、先殺誰、誰能放著給 tank 扛，誰會把隊伍資源直接抽乾。

- 檢視日期：`2026-05-03`
- 分類：[Nevergrind Online 地城冒險與任務攻略](./dungeons/)
- 延伸閱讀：[職業系統總覽](./classes/)、[物品與戰利品總覽](./items-loot/)
- 資料來源：來源摘要、來源資料整理、Nevergrind Wiki Monsters、Fandom general mechanics 與既有筆記交叉整理
- 版本提醒：怪物類型名稱、掉落保證、trait 數量、con 顏色與 boss 圖示可能因版本不同或資料來源不同；實戰請以目前怪物 tooltip、地圖 UI 與 combat log 為準

> **快速重點**
> 先看 con color 判斷等級壓力，再看背景顏色判斷怪物階級，最後看 traits 決定控制和集火順序。
> Champion、Unique / rare、Boss 的掉落保證在不同來源描述不完全一致；筆記採保守說法，不把數量寫成跨版本保證。
> `Rampage`、`Bloodlusted`、`Armored`、`Mana Drain`、`Spirit Drain`、元素強化與 `Nimble` 都會改變隊伍打法。

## 先讀懂怪物資訊

看到怪物時，可以按這個順序判斷：

| 順序 | 看什麼 | 用途 |
| ------ | ------ | ------ |
| 1 | 名字顏色 / con | 判斷怪物相對等級、經驗期待與命中 / 承傷壓力 |
| 2 | 名字背景 | 判斷是 normal、champion、unique / rare、boss 或其他特殊怪 |
| 3 | 職業圖示 | 預測可能技能，例如 rogue、wizard、healer 或 tank 類行為 |
| 4 | Species / type | 判斷 undead、demon、dragonkin 等特攻詞綴是否有用 |
| 5 | Traits / mods | 決定控制、集火、抗性與資源管理 |

這些資訊加起來，才是完整的威脅判斷。紅 con 的普通怪可能比白 con champion 更難處理；帶 `Spirit Drain` 的小怪也可能比普通 boss 更破壞 healer 節奏。

## 強度與掉落階級

來源資料把怪物依強度與掉落期待分成幾個層級。不同 wiki 對名稱與掉落數量的描述可能不完全一致，因此這裡用保守的「戰鬥意義」整理。

| 類型 | 常見辨識 | 戰鬥意義 | 掉落期待 |
| ------ | ------ | ------ | ------ |
| `Peon` | 體型較小，通常沒有特殊 traits | 數值較低，常作為地城雜兵或壓力補充 | 通常不是主要 farm 目標 |
| `Normal` | 一般名字與背景 | 地城基礎敵人，難度提高後可能帶 traits | 掉落看地圖、MF、任務與 RNG |
| `Champion` | 來源摘要提到藍色背景名字 | 數值與抗性提高，traits 多為隨機 | 通常比 normal 更值得打，且有較好掉落期待 |
| `Unique` / rare monster | 來源摘要提到紫色背景；部分舊 wiki 可能稱 rare monster | 常在固定任務或位置出現，第一個 trait / 性質可能固定 | 常是追 magic+ 掉落、任務與路線收益的重點 |
| `Boss` | 紅色背景、體型巨大或地圖 boss 圖示 | 任務目標或章節核心，可能有額外技能與固定 traits | 通常是每場地城最重要的 loot 節點 |

> **提醒**
> 來源摘要提到 Champion 至少掉 1 件藍色以上、Unique / Boss 至少掉 2 件藍色以上；Nevergrind Wiki 舊頁則對 champion、rare monster、boss 的數量描述不同。為避免跨版本誤導，本文只寫成「較好掉落期待」，實際數量以目前版本 tooltip、wiki 與掉落表為準。

## 怪物強度顏色（Con Color）與等級差

`Con` 可理解成 consider，也就是怪物相對於玩家的等級與危險程度。來源摘要整理的顏色光譜大致由低到高為：

```text
灰色 -> 綠色 -> 淺藍色 -> 藍色 -> 白色 -> 黃色 -> 橘色 -> 紅色
```

| Con | 常見意義 | 應對 |
| ------ | ------ | ------ |
| 灰色 | 等級太低，通常沒有經驗價值 | 除非要任務或清路，不必浪費太多時間 |
| 綠色 / 淺藍 / 藍色 | 較低或略低壓力 | 適合練循環、穩定 farm 或清任務 |
| 白色 / 黃色 | 接近玩家等級或略高 | 正常推進的主力目標 |
| 橘色 | 明顯有壓力 | 先看 traits 與隊伍狀態，避免過度拉怪 |
| 紅色 | 高等級高壓力，玩家可能較難命中且承受更高傷害 | 不建議硬打；若是任務目標，先補抗性、控制與隊伍分工 |

來源摘要也提到單一怪物經驗值可能有上限，且灰色怪物不提供經驗。這類數值容易隨版本變動，實務上把 con 當成風險 / 收益提示即可。

## 怪物職業與技能循環

怪物和玩家一樣可能帶有職業方向，並用名稱旁的圖示提示。這會影響它的技能、威脅與優先順序。

| 怪物職業方向 | 可能風險 | 應對 |
| ------ | ------ | ------ |
| 盜賊 / 刺客類 | 背刺、毒、爆發或高攻速 | 不要讓它自由打後排，必要時控住 |
| 巫師 / 施法怪類 | 火球、元素 AoE、遠程爆發 | 打斷、沉默、控場或優先集火 |
| Healer / support 類 | 治療、buff、debuff 或資源干擾 | 優先處理，避免戰鬥被拖長 |
| Tank / armored 類 | 承傷高、拖時間、保護後排 | 交給 magic DPS、debuff 或先清後排 |
| Ranged 類 | 站後排輸出，逼迫隊伍分配 ranged / caster | 物理職注意後排傷害懲罰 |

來源摘要提到怪物可能有兩組獨立技能冷卻循環，刷新頻率與攻擊次數相關。這代表 slow、stagger、paralyze 或攻速控制不是只有減傷，它也可能延後怪物的強力技能。

## 物種（Species）與特攻詞綴

怪物 species / type 會影響裝備上的特攻詞綴與某些職業技能價值。這對 [牧師（Cleric）](./cleric/)、施法職、特定 unique 與 farming route 尤其重要。

| 類型 | 常見例子 | 戰略意義 |
| ------ | ------ | ------ |
| `Humanoid` | Orc、人型敵人 | 可能吃 humanoid damage 詞綴 |
| `Undead` | Skeleton、Ghoul、Vampire | 牧師（Cleric） / 神聖類技能與 undead damage 很值得看 |
| `Demon` | Imp、惡魔類 boss | Demon damage、牧師（Cleric）部分技能與抗性準備很重要 |
| `Dragonkin` | 龍族 boss | 常出現在高壓 boss 或後段任務 |
| `Mystical` | Gargoyle 等神秘生物 | 不一定吃 undead / demon 特攻，別用錯腳本 |
| `Beast` | 野獸類 | 看物理壓力與特攻詞綴 |
| `Giant` | 巨人 | 可能血量高、物理壓力大 |

如果你的 build 依賴特攻，例如 undead / demon bonus，進任務前先看 mission 環境與 boss type。這比進場後才發現加成不吃還要省時間。

## 特性（Traits）與詞綴（Mods）應對表

特殊怪物的 traits 會標示在血條下方。來源摘要提到難度越高，怪物 traits 數量可能越多，例如 Normal、Nightmare、Hell 分別增加數量；這類規則請以目前版本為準。

| Trait | 類型 | 風險 | 應對 |
| ------ | ------ | ------ | ------ |
| `Armored` | 生存 | 物理傷害大幅降低，戰鬥拖長 | 交給 magic DPS，或用 debuff / spell 處理 |
| `Tough` | 生存 | 血量高，消耗資源與時間 | 放在正確擊殺順位，不要讓高威脅怪被忽略 |
| `Nimble` | 生存 / 反制 | 高迴避、招架或反擊壓力 | 用 `Paralyze`、命中補強或控制處理 |
| `Brute` | 進攻 | 高物理傷害 | Tank 檢查減傷，healer 留資源 |
| `Rampage` | 進攻 | 高壓連擊，來源摘要描述為 6 連擊方向 | 用 `Stun` 打斷，不要讓它完整打完 |
| `Dead Eye` | 進攻 | 命中壓力高，閃避不可靠 | 直接控場、減傷或快速擊殺 |
| `Bloodlusted` | 進攻 / 擊殺順序 | 其他敵人死亡後攻擊力暴增 | 通常優先擊殺，或安排控制避免最後失控 |
| Elemental `Enchanted` | 元素 | 元素 AoE、傷害強化與對應抗性提高 | 補 fire / ice / lightning / poison 等抗性，必要時換傷害屬性 |
| `Mana Drain` | 資源 | 攻擊時削減 mana | Caster 保留 potion，隊伍儘快處理 |
| `Spirit Drain` | 資源 | 攻擊時削減 spirit，壓垮 healer / support | Healer 提早喝藥或要求集火 / 控場 |

> **注意**
> 若同時出現抽資源、元素強化、降低治療或高攻速 traits，不要用平常清小怪的節奏處理。這種組合會讓 healer、caster 和 tank 同時被壓住。

## 擊殺順序怎麼排

一個簡單的優先順序：

1. 會讓隊伍立即失控的 trait：`Rampage`、`Bloodlusted`、`Drain`、高元素 AoE。
2. 會拖長戰鬥或保護其他怪的職業：healer、support、caster。
3. 高 con 或 boss 目標，但要先處理會干擾 boss 戰的 adds。
4. `Armored` 或 `Tough` 類高血怪，若沒有立即威脅，可以交給合適傷害類型慢慢處理。
5. 低 con、低威脅 peon / normal 怪，留給 AoE 或順手清。

這不是固定公式。真正的判斷要看隊伍組成：物理隊遇到 `Armored` 會痛苦，法系隊遇到高抗性 elemental boss 也會降速；有恩路者 / 幻術師（Enchanter）控場時，可以把某些高壓怪暫時凍住，先處理別的。

## 和裝備、任務的關係

怪物分類也會反過來影響裝備價值：

- 高 con / 高難度地城讓抗性、HP、armor、resource sustain 更重要。
- Undead / demon 密集任務會提高對應特攻裝、牧師（Cleric）技能與特定 unique 的價值。
- Boss / champion / unique 類敵人通常更值得開 magic find、首通或任務掉落偏好路線。
- `Armored`、elemental resistance 與 drain 類 traits 會讓隊伍需要不同傷害來源與資源解法。

如果你是為了刷裝備而打某條路線，建議把任務 boss type、常見 traits、掉落偏好與你目前缺的部位一起記錄。這會比只記「哪張圖好刷」更耐版本變動。

## 參考資料

- [地城冒險與任務攻略](./dungeons/)
- [職業系統總覽](./classes/)
- [物品與戰利品總覽](./items-loot/)
- [Nevergrind Wiki: Monsters](https://nevergrind.com/wiki/index.php?title=Monsters)
- [Nevergrind Online Wiki: General Game Mechanics](https://nevergrind-online.fandom.com/wiki/General_Game_Mechanics)

---

> **版本提醒**
> 本頁是玩家攻略與社群資料的繁中整理版；技能、裝備、掉落、配方與版本敏感數值，請以目前遊戲內 tooltip / UI 與官方公告為準。
