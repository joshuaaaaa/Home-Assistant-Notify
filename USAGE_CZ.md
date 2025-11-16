# Návod k použití - Notify Card

## Instalace přes HACS

1. Otevřete HACS ve vašem Home Assistant
2. Přejděte do sekce "Frontend"
3. Klikněte na menu (tři tečky) v pravém horním rohu
4. Vyberte "Custom repositories"
5. Přidejte URL tohoto repozitáře
6. Vyberte kategorii "Lovelace"
7. Klikněte na "Install"
8. Restartujte Home Assistant

## Manuální instalace

1. Stáhněte soubor `notify-card.js` z nejnovější verze
2. Zkopírujte ho do `config/www/notify-card.js` ve vašem Home Assistant
3. Přidejte resource v Lovelace dashboardu:
   - Jděte do Nastavení → Přehledy → Zdroje
   - Klikněte "Přidat zdroj"
   - URL: `/local/notify-card.js`
   - Typ zdroje: `JavaScript Module`
4. Restartujte Home Assistant

## Přidání karty do dashboardu

### Přes UI

1. Otevřete váš Lovelace dashboard v editačním módu
2. Klikněte na "Přidat kartu"
3. Najděte "Custom: Notify Card" nebo vyhledejte "notify"
4. Klikněte na kartu pro přidání

### Přes YAML

```yaml
type: custom:notify-card
title: Odeslat notifikaci
```

## Konfigurace

### Základní konfigurace

```yaml
type: custom:notify-card
title: Odeslat notifikaci
```

### Pokročilá konfigurace

```yaml
type: custom:notify-card
title: Odeslat zprávu
default_service: notify.mobile_app_vas_telefon
show_title: true
send_button_text: Odeslat zprávu
```

### Parametry konfigurace

| Parametr | Typ | Výchozí | Popis |
|----------|-----|---------|-------|
| `title` | string | "Send Notification" | Nadpis karty |
| `default_service` | string | (první dostupný) | Výchozí vybraná služba |
| `show_title` | boolean | true | Zobrazit/skrýt nadpis karty |
| `send_button_text` | string | "Send" | Text na tlačítku odeslat |

## Použití

1. **Vyberte službu**: V rozbalovacím menu vyberte notifikační službu (např. "Mobile App Your Phone", "Telegram", atd.)
2. **Napište zprávu**: Do textového pole napište svou notifikaci
3. **Odešlete**: Klikněte na tlačítko "Odeslat" (nebo stiskněte Ctrl+Enter)

## Podporované služby

Karta automaticky detekuje všechny služby typu `notify.*` ve vašem Home Assistant:

- **Mobilní aplikace**: `notify.mobile_app_iphone`, `notify.mobile_app_android`, atd.
- **Telegram**: `notify.telegram`, `notify.telegram_bot`, atd.
- **Alexa**: `notify.alexa_media`, atd.
- **Email**: `notify.smtp`, `notify.gmail`, atd.
- **Push služby**: `notify.pushbullet`, `notify.pushover`, atd.
- A jakékoliv další `notify.*` služby

## Příklady použití

### Notifikace na mobil

```yaml
type: custom:notify-card
title: Notifikace na telefon
default_service: notify.mobile_app_muj_iphone
send_button_text: Poslat na telefon
```

### Notifikace na Telegram

```yaml
type: custom:notify-card
title: Telegram zpráva
default_service: notify.telegram
send_button_text: Poslat do Telegramu
```

### Více karet pro různé účely

```yaml
type: vertical-stack
cards:
  - type: custom:notify-card
    title: Rodinná skupina
    default_service: notify.family_group

  - type: custom:notify-card
    title: Telegram alerty
    default_service: notify.telegram
```

## Tipy a triky

- **Klávesová zkratka**: Stiskněte `Ctrl+Enter` v textovém poli pro rychlé odeslání
- **Status zprávy**: Po odeslání se zobrazí zelená zpráva o úspěchu nebo červená chybová zpráva
- **Automatické čištění**: Po úspěšném odeslání se textové pole automaticky vyčistí
- **Více služeb**: Můžete mít více karet pro různé účely na jednom dashboardu

## Řešení problémů

### Karta se nezobrazuje
- Zkontrolujte, že jste přidali resource v nastavení
- Restartujte Home Assistant
- Zkontrolujte konzoli prohlížeče (F12) pro chybové zprávy

### Žádné služby nejsou k dispozici
- Ujistěte se, že máte nakonfigurované alespoň jednu notify službu
- Zkontrolujte `configuration.yaml` pro notifikační platformy
- Restartujte Home Assistant po změně konfigurace

### Notifikace se neodesílají
- Ověřte, že vybraná služba je správně nakonfigurována
- Zkontrolujte logy Home Assistant pro chybové zprávy
- Otestujte službu manuálně přes Developer Tools → Services

## Podpora

Pokud narazíte na problém nebo máte návrh na vylepšení, prosím vytvořte issue na GitHubu.
