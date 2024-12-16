import { Crown } from "../crown"
import { Book } from "./book"
import { Four } from "./four"
import { Logotype } from "./logotype"
import { Question } from "./question"
import { Tv } from "./tv"

export function AssociationType({
  colorText,
  type,
}: {
  colorText: string
  type: string
}) {
  switch (type) {
    case "":
      return (
        <div title="Ассоциация без ограничений">
          <Crown colorText={colorText} />
        </div>
      )
    case "book":
      return (
        <div title="Ассоциация загадывается в форме рассказа">
          <Book colorText={colorText} />
        </div>
      )
    case "four":
      return (
        <div title="Ассоциация должна содержать 4 слова">
          <Four colorText={colorText} />
        </div>
      )
    case "logotype":
      return (
        <div title="Ассоциация должна быть связанна с каким то известным брендом. Необязательно загадывать сам бренд - ассоциация может  быть  основана на слогане, рекламном ролике и т.д. Вы сами решаете как трактовать понятие бренда.">
          <Logotype colorText={colorText} />
        </div>
      )
    case "question":
      return (
        <div title="Ассоциация загадывается в форме вопроса">
          <Question colorText={colorText} />
        </div>
      )
    case "tv":
      return (
        <div title="Ассоциация должна быть основана  на кинофильме(мультфильме, сериале, телепрограмме)">
          <Tv colorText={colorText} />
        </div>
      )
  }
}
// 1.Ассоциация загадывается в форме рассказа
// 2.Ассоциация про любого сказочного персонажа
// 3.Ассоциация загадывается в форме вопроса
// 4.Ассоциация должна быть основана  на кинофильме(мультфильме, сериале, телепрограмме)
// 5.Ассоциация должна содержать 4 слова
// 6.Ассоциация должна быть связанна с каким то известным брендом.Необязательно загадывать сам бренд - ассоциация может  быть  оснванна на слоганеб рекламном ролике и т.д. Вы сами решаете как трактовать  понятие брендаю
