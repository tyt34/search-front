import { useEffect, useState } from 'react'
import {
  useGetParamsUrl,
  useUrlFetch
} from '../../hooks'
import { useDocuments } from '../../store/hook'
import { ButtonRestart } from '../table-page/components'
import {
  KeysDocument,
  TypeDocument
} from '../../store/slice'
import { Chip } from '@mui/material'
import styles from './detail.module.scss'
import { ConfFetch, getData } from '../../api'

const initialState: TypeDocument = {
  body: '',
  email: '',
  id: 0,
  name: '',
  postId: 0
}

const arrKeyDocumentSort: KeysDocument[] = [
  'id',
  'postId',
  'name',
  'email',
  'body'
]

export const Detail = () => {
  const documents = useDocuments()
  const [document, setDocument] =
    useState<TypeDocument>(initialState)

  const { id } = useGetParamsUrl()

  console.log({ documents, id })

  const getDocument = async () => {
    const settingFetch: ConfFetch = {
      fromId: id,
      toId: id,
      type: 'filter',
      fromPost: '',
      page: 1,
      placeSearch: [],
      textSearch: '',
      toPost: '',
      typeSearch: 'accurate'
    }
    console.log({ settingFetch })
    const { data } = await getData(settingFetch)
    setDocument(data[0])
    console.log({ data })
  }

  useEffect(() => {
    const isStore = !!documents.length
    console.log({ isStore })
    if (isStore) {
      const doc = documents.filter(
        (doc: TypeDocument) =>
          doc.id.toString() === id
      )
      console.log({ D: doc[0] })
      setDocument(doc[0])
    } else {
      getDocument()
    }
  }, [])

  console.log({ document })

  return (
    <>
      <ButtonRestart />

      <section className={styles.document}>
        {arrKeyDocumentSort.map((field) => {
          return (
            <div
              className={styles.line}
              key={field}
            >
              <div className={styles.row}>
                <Chip
                  color="primary"
                  label={`${field.toUpperCase()}:`}
                />
              </div>
              <span>
                {document[field as KeysDocument]}
              </span>
            </div>
          )
        })}
      </section>
    </>
  )
}
