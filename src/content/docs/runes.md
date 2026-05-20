---
title: "Nevergrind Online 符文（Runes）指南"
description: "Runes 是 Nevergrind Online 後期裝備客製化的核心：有 sockets 的裝備可以透過 nevergrind-online-blacksmith.md 的 enchanting / crafting 相關功能加入 rune bonus，把「好裝」推成更明確服務於 build 的核心裝。鑲嵌前先想清楚這件裝備會穿多久，因為符文通常不是拿來"
sourcePages:
  - file: "runeselect.html"
    title: "ルーンの選び方 | Nevergrind Online 攻略DB"
    url: "https://atelier3.web.fc2.com/ngo/runeselect.html"
    lastModified: "Mon, 19 May 2025 15:41:38 GMT"
reviewedAt: "2026-05-05"
sourceLastModified: "Mon, 19 May 2025 15:41:38 GMT"
status: "整理改寫"
---

`Runes` 是 Nevergrind Online 後期裝備客製化的核心：有 sockets 的裝備可以透過 [鐵匠鋪（Blacksmith）](./blacksmith/) 的 enchanting / crafting 相關功能加入 rune bonus，把「好裝」推成更明確服務於 build 的核心裝。鑲嵌前先想清楚這件裝備會穿多久，因為符文通常不是拿來補一件很快會被換掉的過渡裝。

- 檢視日期：`2026-05-05`
- 前置閱讀：[Nevergrind Online 物品與戰利品總覽](./items-loot/)
- 資料來源：來源摘要、SteamDB patch notes、Nevergrind Online 日文 wiki rune list、FC2 / atelier3 攻略 DB rune、rune select、craft、set 與 unique 頁
- 版本提醒：符文效果、可鑲嵌部位、是否可取下、是否可升級，可能會隨 crafting 系統更新；點確認前請以目前遊戲內 UI 和 tooltip 為準

> **快速重點**
> 物理職通常先看武器基礎傷害、攻速、命中與 `Cros` / `Rath` 類傷害收益。
> 魔法職通常先看 enemy resistance reduction、casting haste、crit、元素傷害與資源續航，不要只堆智慧或智力。
> `Marr` 是打寶 / rare drop 方向的代表 rune；但只有在輸出與生存仍然穩定時，堆 magic find 才有實際效率。

## 基本規則

SteamDB 的 2024 Season 2 patch note 提到 [鐵匠鋪（Blacksmith）](./blacksmith/) 的 enchanting counter 已啟用，可以用 runes 強化 socketed items；2025 patch note 又提到 crafting counter 加入 rune upgrade。另一方面，[Nevergrind Online 攻略DB 的 Craft 頁](https://atelier3.web.fc2.com/ngo/mythical.html) 把鐵匠鋪（Blacksmith）的 `Craft` tab 描述成製作 Mythical / Rune Words 類裝備的入口。這代表 rune 系統至少要分成兩種情境：一般 socketing 是把 rune bonus 放進裝備，Mythical crafting 則是用 base item 和 runes 觸發 recipe。

| 情境 | 需要什麼 | 結果 | 注意 |
| ------ | ------ | ------ | ------ |
| 一般 socketing / enchanting | 已有 sockets 的裝備 + 對應 rune | 裝備獲得 rune tooltip 上的加成 | 來源摘要把鑲嵌視為不可逆；高階 rune 先當成長期投入 |
| Mythical / Rune Words crafting | 正確 socketed base + recipe runes + gold | 透過 鐵匠鋪（Blacksmith） `Craft` tab 產生 Mythical 類裝備 | runes 只要在背包中，不需要先鑲進 base；Craft 後 sockets 會被消耗 |
| Rune upgrade via crafting | 依目前 Craft tab 顯示的 rune recipe | 升級 rune 或進行相關 crafting | 成本和可用 recipe 曾被 patch 調整，以目前 UI 為準 |

操作前先確認：

- 這件裝備是否有 sockets。
- 該 rune 是否能放進這個部位，例如 1h、2h、armor 或 charm。
- 鑲嵌是否不可逆，或目前版本是否有取下 / 覆蓋 / 升級機制。
- 裝備是否值得長期穿到你投入高階 rune。
- 這個 rune 是補 build 核心，還是只是看起來數字漂亮。
- 你現在做的是一般 socketing，還是 [鐵匠鋪（Blacksmith）的 Mythical / Rune Words crafting](./blacksmith/#crafting-mythical-rune-words)。

> **注意**
> 來源摘要把 rune 鑲嵌視為永久且不可逆；但 2025 patch note 已提到 rune upgrade via crafting。實務上請先把「已鑲嵌到裝備上的 rune」和「放在背包中當 recipe 素材的 rune」分開看，並在遊戲內確認目前 crafting counter 的實際規則。

## 符文名稱與資料來源

日文 wiki 目前列出一批 rune 名稱與等級，例如 `Gra`、`Gart`、`Ruck`、`Nag`、`Rok`、`Skar`、`Targ`、`Tae`、`Rath`、`Marr`、`Cros`、`Mael` 等。來源摘要則進一步整理了這些符文在不同職業與部位上的使用方向。

本文把它們當成 build 策略筆記，不把每個 rune 的數值寫死。若要查逐顆 required level、升級 recipe 與鑲嵌效果，可看 [符文升級與效果表](./rune-upgrades/)；真正要鑲嵌前，仍要看當前 tooltip。

<a id="rune-fc2-selection"></a>

## FC2 選擇速查

FC2 的 `Rune Select` 頁是玩家 meta snapshot，頁面也明說內容仍可能改寫。它的重點不是背一個永遠正確的順位，而是先問「這顆 rune 是要放在哪種 weapon / armor slot，角色缺的是傷害、命中、速度、資源，還是 farm 效率」。

| 情境 | FC2 建議方向 | 筆記讀法 |
| ------ | ------ | ------ |
| 物理單手 | `Cros` > `Targ` > `Gart` | 單手通常速度快、基礎值低，加算 weapon damage 常更有效；但慢速單手例外，且 `Cros` 稀有 |
| 物理雙手 | `Rath` > `Targ` > `Gart` | 雙手基礎值高、速度慢，`Rath` 類 attack ability / % 方向更容易放大穩定輸出 |
| Ranger 弓 | `Cros` / `Rok` > `Targ` > `Gart` | Ranger 弓很吃 base speed 與 socket count；高階比較要搭配 DPS calculator 或遊戲內 tooltip |
| 非 Ranger 物理職弓 / charm | `Rath` > `Targ` > `Gart` | 大致照雙手物理看；Monk 因不能裝弓而看 charm，部分 rune 在 charm 上會變成防具效果，`Targ` 反而更穩 |
| 魔法武器 | `Mael` > elemental damage / `Tae`，另備 `Skar` | stat rune 如 `Ruck` / `Nag` 不一定有效；`Mael` 稀有時，`Tae` 或 casting speed 補洞更實際 |
| 命中 / proc | `Rath` > `Targ` > `Shir` > `Gart`，或看 `Rok` | 尤其是缺 attack ability talent 的 caster，例如 Wizard，可能為了 proc 率補命中 |
| Mana sustain | `Gra` | Monk、Crusader 這類 mana 消耗快的角色，可準備 hit mana recovery 副裝 |
| 物理防具 | `Rath`、`Marr`，缺抗就補 resistance | `Rath` 放防具很奢侈；只有戰力穩定或特別缺某屬性時才投入 |
| 魔法防具 | `Marr`，缺抗就補 resistance | FC2 用消去法看 `Marr`；適合放在能多角共享的長期 farm 裝 |

> **提醒**
> 這張表是 FC2 的選擇邏輯摘要，不是官方公式。若要投入稀有 `Cros`、`Rath`、`Mael` 或 `Marr`，先確認目前版本 tooltip、裝備速度、socket count、角色命中與隊伍 buff。

Ranger 弓是最需要回到實物比較的例外。FC2 以 `Sinifay's Golden Harrier` 和 `Reito Doku` 說明：同樣是弓，base speed 與 sockets 會讓 `Cros`、`Rok`、`Targ` 的相對效率改變。公開筆記中不要把單一弓的 rune 順位直接套到所有 ranged weapon。

`Rune Select` 頁點名的裝備可以這樣記：

| 裝備 | 類型 | 為什麼出現在 rune 選擇裡 |
| ------ | ------ | ------ |
| `Sinifay's Golden Harrier` | Ranger elite set bow | FC2 用它當較慢、高階 Ranger set bow 例子；在該頁讀法裡，`Cros` 較有利，`Rok` 約接近 `Targ` |
| `Reito Doku` | Legendary bow / `Osage Bow` | FC2 用它當高速 bow 例子；因 base speed 快且可有多 sockets，後段 socket 的 `Rok` 可能比 `Cros` 更有效 |
| `Mosby's Ancient Crown` | Legendary head / `Shako` | FC2 把它當成多角色可共用的防具 farm 候選；若要塞 `Marr`，先確認 socket roll 與角色是否會長期輪用 |

<a id="rune-marr-magic-find"></a>

## 打寶裝與 `Marr`

FC2 rune 頁把 `Marr` 列為 rare drop 方向的 rune。它適合拿來做 farm set 或 magic find / rare drop 裝，但不是所有角色都應該一看到 sockets 就塞滿 `Marr`：如果 clear speed、抗性或資源循環被壓垮，實際掉寶效率可能反而下降。

`Marr` 的使用可以分成三層：

| 層級 | 適合怎麼用 | 注意 |
| ------ | ------ | ------ |
| 安全 farm | 放在長期穿的 farm 裝、低風險防具或工具欄 | 先確認目前地城不會因少了防禦 / 抗性而翻車 |
| 共享打寶裝 | 放在 `Charlatan's Crest`、`Mosby's Ancient Crown`、`Trek of Glory` 這類多職業可輪用的 farm 候選 | 透過共享銀行輪流穿很有價值，但仍要看 armor type、required level 與 roll |
| 戰力溢出後 | 物理職 ranged slot 或高 socket 工具裝也可轉成 rare drop 方向 | 不要犧牲命中、資源與高難度生存門檻 |

> **提醒**
> `Charlatan's Crest`、`Mosby's Ancient Crown` 與 `Trek of Glory` 本身就帶 rare drop / gold / exp 類 farm 詞綴方向，適合當打寶裝關鍵字。它們不是 rune 專用底材；真正要鑲嵌前，仍要確認當前物品是否有 sockets、是否會長期使用，以及這顆 `Marr` 的機會成本。

## 物理職武器

物理職的 rune 選擇，先看武器基礎與角色問題在哪裡。

| 情境 | 優先方向 | 判斷 |
| ------ | ------ | ------ |
| 單手武器 | `Cros` 武器傷害 > `Targ` 全被動 > `Gart` strength | 單手基礎傷害較低，直接補 weapon damage 往往很有感 |
| 兩手武器 | `Rath` 攻擊能力 / 攻擊百分比 > `Targ` 全被動 > `Gart` strength | 兩手基礎傷害高，百分比與命中相關收益通常更能放大穩定度 |
| 弓 | `Rath` 攻擊能力 / 攻擊百分比、`Targ` 全被動、或依速度改看 `Rok` | 依武器速度、socket 數與職業技能判斷；高 sockets ranged slot 也可能是工具裝 |
| 命中不足 | `Rath` / `Shir` 類攻擊能力 | 打不中時，帳面傷害再高也沒有意義 |
| 資源斷循環 | `Gra` hit 時 mana 回復 | 適合高攻速、頻繁命中的 build |

FC2 的 `Demetrium` set 頁把 `Demetrium's Ballista` 列為 `Socketed (1-6)`。若 roll 到高 sockets，即使是較低等級套裝弓，也可能因 rune space 而保有後期價值。這個觀念比單一裝名更重要：有時候 sockets 數量會改寫裝備上限。

`Demetrium's Ballista` 這類 ranged slot 工具裝可以依目標分流：

| 目標 | 可考慮 rune | 讀法 |
| ------ | ------ | ------ |
| 命中 / 穩定輸出 | `Rath` | 高難度打不中時，攻擊能力通常比更多帳面傷害更有感 |
| 泛用被動與 breakpoint | `Targ` | 可補全被動方向，適合缺多種小斷點時比較 |
| 純力量 / 傷害 | `Gart` | 只在命中與資源已穩時再追 |
| 打寶 | `Marr` | 戰力溢出、刷圖安全時再把 rune space 轉成 rare drop |

> **注意**
> `Demetrium's Ballista` 不是每把都保證達到 socket 上限。公開筆記中請寫成「`Socketed (1-6)`，高 socket roll 很有價值」，不要寫成每把都達上限的神裝。

## 跨職業經驗值升級套裝

如果要做一套給分身輪流穿的經驗值升級裝，核心不是追單件裝備名稱，而是找「多職業可穿、sockets 夠多、等級需求合理」的 base，再放入 `Thex`。FC2 rune 表列出 `Thex` 的武器效果是 `+10% 經驗值取得率`；同表也註明兩手武器套用武器數值時會加倍，弓視為兩手武器，盾牌視為防具。因此實際加成要以目前裝備 tooltip 為準，不要用所有 socket 都乘上 10% 來硬算。

| 部位 / 目標 | 優先 base | 讀法 |
| ------ | ------ | ------ |
| 主手 | 高 sockets 單手鈍器（`1h Blunt`） | [職業裝備可用性速查](./classes/#職業裝備可用性速查)顯示所有職業都能使用單手鈍器，是最穩的共享主手方向；低等單手武器常見 socket 上限仍有限，要看實際 roll |
| 副手 | 盾牌、可雙持時的第二把單手鈍器，或 caster off-hand | 盾牌全職業可用且適合 Lv1 過渡，但 `Thex` 在盾牌會走防具效果，重點是生存而不是 XP；若要副手也提供 XP，需確認該職業當下能雙持武器或使用對應 off-hand |
| Ranged / sub slot | 高 socket bow，特別是 `Demetrium's Ballista` | FC2 `Demetrium` set 頁列為 level 29、`Socketed (1-6)`；若 roll 到高 sockets，物理職可把它當經驗值或打寶工具欄，但不代表每把都 6 sockets |
| 法系 / 武僧替代 | Charm、caster off-hand、可用的單手鈍器 | 無法使用 bow 的職業要改看自己可裝備的 off-hand 與 charm；socket 數通常比 `Demetrium's Ballista` 保守，實際價值看 roll |

實務順序可以這樣抓：

1. 先準備一把高 socket 單手鈍器，讓最多職業能從主手吃到 `Thex` 的武器效果。
2. Lv1 或雙持條件未滿前，副手先用盾牌補生存；不要把盾牌上的 `Thex` 當作經驗值加成來源。
3. 具備雙持或可用 caster off-hand 後，再比較第二把單手武器 / 法器 / charm 是否值得投入 `Thex`。
4. 物理職若能裝 `Demetrium's Ballista`，高 socket roll 可作為 ranged / sub slot 的經驗值工具裝；武僧和多數施法職要另外找 charm 或可用 off-hand。
5. 鑲嵌前先檢查 required level、屬性需求、是否會被下一件裝很快替換，以及 `Thex` 的成本是否值得投入這件 base。

> **來源分級**
> 這段是 FC2 / 玩家 meta snapshot 加上站內職業可用性整理，不是官方保證公式。`Thex`、兩手武器加倍、弓與盾牌的判定請以目前遊戲內 tooltip / UI 為最終準則。

## 魔法職與支援職武器

魔法職不要只看 `Wisdom` / `Intelligence` 這類 stat rune。來源摘要認為 `Ruck`、`Nag` 這類純屬性 rune 對 caster 火力提升偏弱，因為真正的瓶頸常常在 resistance reduction、cast speed、crit、技能加成與資源。

| 需求 | 優先方向 | 適用情境 |
| ------ | ------ | ------ |
| 打高抗性怪 | `Mael` enemy resistance reduction | 高難度與 boss farm 很重要 |
| 提高爆發 | `Tae` crit 或屬性傷害 rune | 已有足夠命中 / sustain 時再追；通常排在 resistance reduction 後面 |
| 缺 casting haste | `Skar` casting speed | 沒有天騎士（Templar）、恩路者 / 幻術師（Enchanter）、吟遊詩人（Bard）支援時更有感 |
| 想刷寶 | `Marr` rare drop / magic find 類 | 防具或低風險 farm 裝可考慮 |
| 魔力不足 | `Gra` 或資源回復詞綴 | 對高頻率施法或混合攻擊 build 有價值 |

對牧師（Cleric）、德魯伊（Druid）、薩滿（Shaman）這類治療 / 混合職來說，rune 不只是輸出。你可能需要在 healing uptime、resist、casting speed、spirit / mana sustain 與 magic find 之間取捨。

## 防具符文

防具 rune 的角色比較像補洞。你可以把它分成三種用途：

1. 補生存
   - 抗性、armor、生命、全屬性、防禦。
2. 補效率
   - magic find、gold find、移動速度或資源回復。
3. 補 build breakpoint
   - all talents、all passive、技能加成、casting haste。

來源摘要提到，物理防具用 `Rath` 類全 stat / strength 方向可能很奢侈；如果角色抗性很破，先補抗性比追輸出更合理。魔法防具在沒有明確缺口時，`Marr` 類刷寶符文是常見選擇。

防具要不要塞 `Marr`，可以用這個順序判斷：

1. 抗性、HP / resource、armor 是否已能穩刷目標地城。
2. 這件防具是否會長期穿，或至少能被多個角色透過共享銀行輪用。
3. 這個部位是否原本就偏 farm，例如 rare drop、gold find、exp find、run speed。
4. 少掉一顆防禦 / 抗性 rune 後，clear speed 是否仍然穩定。

如果答案不確定，先不要把高價 `Marr` 放進短期過渡裝。打寶裝的核心不是把每個孔都變成 magic find，而是讓角色能穩定、快速、低死亡率地重複刷圖。

<a id="rune-socketed-base"></a>

## Socketed base 與 craft 風險

FC2 craft 頁把 socketed item 描述為名稱灰色，或白字但帶 sockets 的物品。它可以拿來做兩件不同的事：一般 rune socketing，以及在 鐵匠鋪（Blacksmith） `Craft` tab 作為 Mythical / Rune Words 的 base。這兩件事不要混在一起。

| 情境 | 重點 | 常見誤解 |
| ------ | ------ | ------ |
| 一般 rune socketing | 把 rune bonus 放進已有 sockets 的裝備 | 以為之後一定能安全取回；來源摘要仍建議當成不可逆成本 |
| Mythical / Rune Words craft | base + recipe runes + gold；runes 在背包即可，不需要先插入 base | 以為 craft 會同時吃到 rune tooltip bonus |
| Superior socketed base | FC2 craft 頁說 Superior 武器 / 防具加成會在製作後加算 | 只因 sockets 多就投入稀有 rune，卻忽略 base tier、roll 與職業詞綴 |

Socketed base 可以從地城掉落，也可能出現在藥劑店（Apothecary）、鐵匠鋪（Blacksmith）或商人（Merchant）。既有商店筆記把 restock 寫成來源摘要中的約 1 小時節奏，但實際仍要以目前 UI 為準。完整 base 選擇與 Superior / Ethereal 繼承規則可看 [鐵匠鋪製作與配方深度筆記](./blacksmith-crafting-recipe-research/#crafting-base-selection)。

<a id="rune-tactical-uses"></a>

## 特殊戰術應用

有些 rune 不一定是最高傷害，但能讓 build 變順：

| 情境 | 可考慮方向 | 判斷 |
| ------ | ------ | ------ |
| 武僧（Monk）、十字軍（Crusader） / 聖騎士（Paladin）這類資源消耗快的角色 | `Gra` hit 時 mana 回復 | 可放在副手或過渡武器上，穩住沒有隊友支援時的續航 |
| 物理職想利用 ranged slot 當工具欄 | 高 sockets bow、`Demetrium's Ballista` 類工具裝 | 低等裝若 roll 到高 sockets，也可能改寫後期工具價值 |
| 巫師（Wizard）或施法職需要提高 proc 節奏 | `Rok` weapon speed、`Targ` 全被動或符合 rotation 的 weapon base | 速度與 internal cooldown 是否匹配，比單看 rune 等級更重要 |
| 刷寶裝 | `Marr` magic find / rare drop 類 rune | 只在輸出與生存仍安全時才堆，避免 farm 速度反而下降 |

## 依隊伍配置調整

符文不是單機計算器，它會受到隊伍影響。

- 有吟遊詩人（Bard）回魔、haste、資源歌曲時，可以少補一些 sustain。
- 有恩路者 / 幻術師（Enchanter）或法系支援時，casting haste 壓力可能降低。
- 沒有穩定支援時，`Gra`、`Skar`、資源與抗性 rune 的價值上升。
- 物理隊伍缺命中時，攻擊能力 rune 可能比更多傷害更有用。
- 高難度 boss farm 中，抗性與資源斷點通常比多一點 magic find 更重要。

## 鑲嵌前檢查表

鑲嵌高價 rune 前，先問自己：

1. 這件裝備會穿多久？
2. 這件裝備的 sockets 數是否值得投入？
3. 這個 rune 是補核心問題，還是只增加漂亮數字？
4. 我的 build 是單刷、組隊、刷寶，還是 boss farm？
5. 有沒有隊友 buff 會讓某個 rune 的收益下降？
6. 目前版本是否允許 rune upgrade、覆蓋或取回？
7. 如果明天拿到更好的 unique / set，這顆 rune 會不會心痛？

好的 rune 策略不是把最貴的東西塞上去，而是把裝備最後一段缺口補到剛好。物理職追基礎與命中質變，魔法職追 resistance reduction 與施法節奏，防具則負責讓角色不被難度反咬。

<a id="fc2-rune-craft-full-reference"></a>

## FC2 Rune / Craft 全量參考

FC2 的 rune、rune select、craft 與 item mods 頁已整理到 [FC2 Rune、Craft 與 Item Mods 全量參考](./fc2-rune-craft-reference/)。本文保留符文策略；逐顆升級 recipe 與目前觀測到的 rune effect 可搭配 [符文升級與效果表](./rune-upgrades/) 查表。

## 參考資料

- [SteamDB: Enchanting With Runes Enabled](https://steamdb.info/patchnotes/16172899/)
- [SteamDB: Added ability to upgrade runes via crafting](https://steamdb.info/patchnotes/18527675/)
- [Nevergrind Online 日本語 Wiki: ルーン](https://wikiwiki.jp/ngowiki/%E3%83%AB%E3%83%BC%E3%83%B3)
- [FC2 攻略 DB：Rune](https://atelier3.web.fc2.com/ngo/rune.html)
- [FC2 攻略 DB：Rune Select](https://atelier3.web.fc2.com/ngo/runeselect.html)
- [FC2 攻略 DB：Demetrium set](https://atelier3.web.fc2.com/ngo/demetrium.html)
- [FC2 攻略 DB：Craft](https://atelier3.web.fc2.com/ngo/mythical.html)
- [FC2 攻略 DB：Unique Head](https://atelier3.web.fc2.com/ngo/uhead.html)
- [FC2 攻略 DB：Unique Boots](https://atelier3.web.fc2.com/ngo/uboot.html)
- [Nevergrind Wiki: Magic Find Mechanics](https://nevergrind.com/wiki/index.php?title=Magic_Find_Mechanics)
- [Nevergrind Online Wiki: Loot](https://nevergrind-online.fandom.com/wiki/Loot)

---

> **版本提醒**
> 本頁是玩家攻略與社群資料的繁中整理版；技能、裝備、掉落、配方與版本敏感數值，請以目前遊戲內 tooltip / UI 與官方公告為準。
