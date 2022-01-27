const claimsMessagesSubjectCommon = {
      worker: 'Рабочих',
      timeReport: 'Отчёты времени',
      activity: 'Задачи',
      role: 'Роли',
      user: 'Пользователей',
      invite: 'Приглашения',
      project: 'Проекты',
      monthTimeReview: 'Ежемесячные отчеты',
      claim: 'Ограничения действий',
}

const claimsMessagesSubjectManage = {
      worker: 'Рабочими',
      timeReport: 'Отчётами времени',
      activity: 'Задачами',
      role: 'Ролями',
      user: 'Пользователями',
      invite: 'Приглашениями',
      project: 'Проектами',
      monthTimeReview: 'Ежемесячными отчетами',
      claim: 'Ограничениями действий',
}

export const claimsMessages = {
  can: 'Может',
  all: 'Всем',
  header: 'Действия и субъекты',
  actions: {
    read: 'Просматривать',
    create: 'Создавать',
    update: 'Обновлять',
    delete: 'Удалять',
    manage: 'Управлять',
  },
  subject: {
    read: claimsMessagesSubjectCommon,
    create: claimsMessagesSubjectCommon,
    update: claimsMessagesSubjectCommon,
    delete: claimsMessagesSubjectCommon,
    manage: claimsMessagesSubjectManage,
  },
  claim: {
    id: '№',
    action: 'Действие',
    subject: 'Субъекты',
  },
};
