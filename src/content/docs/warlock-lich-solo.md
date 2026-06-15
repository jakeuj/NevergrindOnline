---
title: "Nevergrind Online 術士（Lich / Plaguebearer）終局單刷指南"
description: "術士（Warlock）終局單刷指南，整理 Lich Form、Drain Soul、Plaguebearer、Poison Shock、武器速度與恐懼控場。"
sourcePages: []
reviewedAt: "2026-05-27"
sourceLastModified: "N/A"
status: "整理改寫"
---

術士（Warlock）終局單刷的核心是自給自足：`Lich Form` 讓普通攻擊變成多目標近戰語言，`Plaguebearer` / `Poison Shock` 提供高 Health 目標的前段壓力，恐懼與 debuff 能降低被打崩的風險，`Drain Soul` 則是血線危險時的關鍵回血按鍵。

- 檢視日期：`2026-05-27`
- 分類：[終局單刷職業與流派總覽](/endgame-solo-classes/)
- 前置閱讀：[職業系統總覽](/classes/)、[套裝指南](/set-items/)、[Cryptic Paragon（Haniwa）](/cryptic-paragon-haniwa/)
- 資料來源：FC2 / atelier3 `Warlock` 職業頁、站內職業總覽、套裝與 unique 裝備整理
- 版本提醒：本頁的 `Plague` rank、武器速度與 `Poison Shock` 觸發讀法來自 FC2 / 玩家 meta snapshot；實際效果請以目前遊戲內 tooltip 為準

> **快速重點**
> 術士適合喜歡 DoT、恐懼、debuff、吸血與武器速度調校的玩家。
> FC2 的 `Plaguebearer` 思路是讓 `Poison Shock` 冷卻與右手武器速度對齊，盡量每次攻擊都觸發。
> 單刷時 `Drain Soul` 是重要安全網，但不能取代抗性、仇恨與站位。

## 單刷定位

FC2 術士頁強調它擅長在戰鬥前半段打出大量傷害，對高 Health 怪物特別有效。這讓術士很適合處理 Champion 或高耐久目標，但也帶來一個問題：爆發與比例傷害容易拉仇恨，若防禦、恐懼或回血節奏沒準備好，皮甲職仍會被打穿。

| 面向 | 術士的優勢 | 單刷風險 |
| ------ | ------ | ------ |
| 輸出 | `Poison Shock`、`Venom Bolt`、`Engulfing Darkness`、DoT / debuff | 敵人 Health 偏低或數量少時，比例傷害價值下降 |
| 生存 | `Drain Soul`、恐懼、盾牌取捨、debuff | 高仇恨 burst 可能讓自己成為集火目標 |
| 裝備 | `Noik`、`Tyranid`、`Cryptic Paragon`、`Ender's Zeitgeist` | 右手速度、`Plague` rank 與加速 buff 需要一起算 |

## Plaguebearer 與武器速度

FC2 術士頁說明，`Mastery: Plague` 內建的 `Poison Shock` 會在冷卻結束後保證觸發；rank 越高，冷卻越短。其整理的門檻如下，實作時仍以目前 tooltip 為準。

| `Plague` Rank | 19 | 20 | 21 | 22 | 23 | 24 | 25 |
| ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| 冷卻時間 | 3.3 | 2.9 | 2.6 | 2.3 | 2.0 | 1.7 | 1.5 |

FC2 推測效果本身的 global cooldown 約為 1.5 秒，因此 `Plague` 到 25 以上可能不再縮短。公開筆記中應保留這個「推測」語氣，不要寫成官方公式。

實戰裝備要反推右手武器速度：

- 沒有速度 buff 時，FC2 建議準備 1.5 速度武器，並點名 64 級獨特刺擊 `Hellspike`，但速度 1.4 版本不適用。
- 有 20% 速度 buff 時，理想武器速度約 1.9，FC2 提到 `Procyon's Fragment` 正好符合。
- 有 Bard 或 Ranger 速度支援時，可重新評估 `Cryptic Paragon` 這類較慢但詞綴強的武器。

## Lich Form 與保命工具

單刷術士的另一條線是 `Lich Form`。FC2 說明 `Crescent Strike` 會讓 `Lich Form` 下的普通攻擊變成圓形範圍內多目標連續命中。進地城後先補 `Lich Form` 與 `Profane Spirit`，若追求終局優化，可在 buff 前換上 `Superior Lich Form` 加成裝，再切回平常裝備。

| 工具 | 用途 |
| ------ | ------ |
| `Lich Form` | 改變普攻語言，放大多目標與普通攻擊價值 |
| `Profane Spirit` | 進場前維持的核心 buff |
| `Engulfing Darkness` | 開戰時往敵群中央打入，配合 `Poison Shock` 壓前段傷害 |
| `Panic Strike` / `Haunting Vision` | 生存壓力大時施加恐懼，避免被硬貼 |
| `Drain Soul` | 自身 Health 危險時回血，是單刷安全網 |

## 操作循環

進場前：

```text
Lich Form -> Profane Spirit
```

開戰後：

```text
Engulfing Darkness 打入敵群
鎖定 Champion 或高耐久敵人
維持 debuff / 恐懼
Venom Bolt 補打被鋪好的目標
危險時 Drain Soul
```

如果你的地城敵人數量少、敵人 Health 偏低，或 `Plague` 等級嚴重不足，FC2 建議可以改以 `Demi Lich` 的 `Death Toll` 為核心。這一點很適合放在單刷頁：`Plaguebearer` 是高 Health / Heroic 想定，不代表所有情境都最佳。

## 裝備方向

FC2 術士例以 `King of Riven Grotto` 英雄周回為想定，天賦樹加成收集 `Plaguebearer`，技能加成收集 `Venom Bolt` 與 `Engulfing Darkness`。因為攻擊速度需求，它不使用套裝武器，套裝也因此容易被拆。

| 部位 / 方向 | FC2 關鍵字 | 判斷重點 |
| ------ | ------ | ------ |
| 右手 | `Cryptic Paragon`、`Hellspike`、`Procyon's Fragment` | 依 `Poison Shock` 冷卻、武器速度與隊伍速度 buff 調整 |
| 左手 | `Ender's Zeitgeist` 或雙持 | 盾牌較穩，雙持火力高但更容易拉仇恨 |
| 套裝骨架 | `Noik`、`Tyranid` | 取 `Plaguebearer`、技能加成、Rare Drop Rate 與抗性 |
| 抗性 slot | `Zamtil's Plenitude`、`Jibekn's Patrimony` | 腿甲與靴子常用來補抗性，抗性足夠後再換 Rare Drop Rate |
| 替代件 | `Tyranid's Haunting`、`Yon's Ephemeral Grasp`、`Trek of Glory` | 追 Rare Drop Rate 時可考慮，但要比較套裝 bonus、防禦與抗性損失 |

術士很容易被好看的輸出詞綴誘惑，但單刷第一層仍是活下來。左手盾牌不是輸出最高，卻能讓高仇恨 burst 後的安全性高很多。

## 單刷優先順序

1. 先決定走 `Plaguebearer` 還是低裝 / 低怪血更合適的 `Demi Lich` 方向。
2. 把 `Plague` rank 與右手武器速度對齊，不要只看武器名字。
3. 維持 `Lich Form`、`Profane Spirit`，高壓時優先恐懼與 `Drain Soul`。
4. 抗性、物理防禦與控制抗性過線後，再拆裝追 Rare Drop Rate。
5. 若單刷常被集火，左手先用盾牌；能穩定控場後再比較雙持火力。

## 常見失誤

- 把 `Plague` 25 以上仍會明顯縮冷卻寫成定論；FC2 只把 1.5 秒視為推測上限。
- 有速度 buff 後仍拿錯右手速度，導致 `Poison Shock` 觸發節奏浪費。
- 為了雙持火力放棄盾牌，結果 burst 後被仇恨打崩。
- 把 `Drain Soul` 當成唯一防線，而不補抗性、恐懼與站位。
- 在低 Health 或低密度地城硬套 `Plaguebearer`，忽略 `Demi Lich` 替代方向。

## 參考資料

- [FC2 攻略 DB：Warlock](https://atelier3.web.fc2.com/ngo/warlock.html)
- [Nevergrind Online Wiki: Warlock](https://nevergrind-online.fandom.com/wiki/Warlock)
- [FC2 職業 Build 摘要：術士](/fc2-class-build-index/#fc2-warlock)
- [套裝（Set Items）指南](/set-items/)
- [Cryptic Paragon（Haniwa）](/cryptic-paragon-haniwa/)
- [嚴選獨特裝備速查](/fc2-selected-unique-items/#fc2-selectlist2)

---

> **版本提醒**
> 本頁是玩家攻略與社群資料的繁中整理版；技能、裝備、掉落、配方與版本敏感數值，請以目前遊戲內 tooltip / UI 與官方公告為準。
