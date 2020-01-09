export default {
  state: {
    selectFieldsType1: [
      {
        idSelectField: 'field1-type1',
        name: 'Толщина металла',
        sym: 't',
        unit: 'мм',
        arraySelectItems: ['0.5', '0.55', '0.6', '0.7', '1.0'],
        default: '0.55'
      },
      {
        idSelectField: 'field2-type1',
        name: 'Тип металла',
        arraySelectItems: ['Оц. сталь', 'Нерж. сталь']
      },
      {
        idSelectField: 'field3-type1',
        name: 'Тип соединения',
        arraySelectItems: ['Фланец №20', 'Фланец №30', 'Нет']
      }
    ],
    selectFieldsType2: [
      {
        idSelectField: 'field1-type2',
        name: 'Толщина металла',
        sym: 't',
        unit: 'мм',
        arraySelectItems: ['0.5', '0.55', '0.6', '0.7', '1.0']
      },
      {
        idSelectField: 'field2-type2',
        name: 'Тип металла',
        arraySelectItems: ['Оц. сталь', 'Нерж. сталь']
      },
      {
        idSelectField: 'field3-type2',
        name: 'Тип соединения',
        arraySelectItems: ['Нет', 'Фланец']
      }
    ]
  },
  getters: {
    getSelectFieldsType1: (state) => state.selectFieldsType1,
    getSelectFieldsType2: (state) => state.selectFieldsType2
  }
}
