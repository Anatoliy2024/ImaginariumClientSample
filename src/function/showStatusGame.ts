export function showStatusGame(status: string) {
  switch (status) {
    case "hostChoosesCard": {
      return "Ведущий выбирает карту"
    }
    case "playersChooseCard": {
      return "Игроки выбирают карту"
    }
    case "guessCard": {
      return "Игроки угадывают карту"
    }
    case "showResult": {
      return "Результаты раунда"
    }
  }
}

// "hostChoosesCard", //"playersChooseCard","guessCard","showResult"
