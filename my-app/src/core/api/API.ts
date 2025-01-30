/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */
export interface ExpertiseComment {
  comment?: string;
}

export interface PaintingInExpertise {
  /** ID картины */
  pk: number;
  /** Название картины */
  title: string;
  /** Путь к изображению картины */
  img_path: string;
  /** Комментарий к картине */
  comment: string;
  description?: string;
}

export interface CreateExpertiseByIdResponse {
  /** ID экспертизы */
  pk: number;
  /** Статус экспертизы */
  status: 1 | 2 | 3 | 4 | 5;
  /** Пользователь, создавший экспертизу */
  user: string;
  /** Дата создания экспертизы */
  date_created: string;
  /** Автор экспертизы */
  author: string;
  /** Дата формирования экспертизы */
  date_formation?: string | null;
  /** Дата завершения экспертизы */
  date_completion?: string | null;
  /** ID менеджера, назначенного на экспертизу */
  manager: number;
  /** Список картин, входящих в экспертизу */
  paintings: ExpertiseComponent[];
}

export interface CreatedExpertise {
  /** ID экспертизы */
  pk: number;
  /** Статус экспертизы */
  status: 1 | 2 | 3 | 4 | 5;
  /** Пользователь, создавший экспертизу */
  user: string;
  /** Дата создания экспертизы */
  date_created: string;
  /** Автор экспертизы */
  author: string;
  /** Дата формирования экспертизы */
  date_formation?: string | null;
  /** Дата завершения экспертизы */
  date_completion?: string | null;
  /** ID менеджера, назначенного на экспертизу */
  manager: number;
  /** Список картин, входящих в экспертизу */
  result: boolean;
}

export interface Painting {
  /** ID */
  pk?: number;
  id?: number;
  /**
   * Название
   * @minLength 1
   * @maxLength 30
   */
  title?: string;
  /**
   * Путь к изображению
   * @minLength 1
   * @maxLength 255
   */
  img_path?: string;
  /**
   * Краткое описание
   * @minLength 1
   * @maxLength 255
   */
  short_description?: string;
  /**
   * Полное описание
   * @minLength 1
   */
  description?: string;
}

export interface ExpertiseComponent {
  painting: Painting;

  comment?: string;
}

export interface User {
  /** ID */
  id?: number;
  /**
   * Username
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username?: string;
  /**
   * Email address
   * @format email
   * @maxLength 254
   */
  email?: string;
  /**
   * Password
   * @minLength 1
   */
  password?: string;
}

export interface AuthRequest {
  /**
   * Логин пользователя
   * @example "user123"
   */
  username: string;
  /**
   * Пароль пользователя
   * @example "password123"
   */
  password: string;

  email?: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://127.0.0.1:8000" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Create expertises API
 * @version v1
 * @license RIP License
 * @baseUrl http://127.0.0.1:8000
 * @contact <sgrenkov39@gmail.com>
 *
 * API for creating painting_expertises
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  paintingExpertise = {
    /**
     * @description Получение списка сформированных экспертиз
     *
     * @tags painting_expertise
     * @name PaintingExpertiseList
     * @request GET:/painting_expertise
     * @secure
     */
    paintingExpertiseList: (
      query?: {
        /** Фильтр по статусу */
        status?: string;
        /** Начало периода формирования (дата) */
        formation_start?: string;
        /** Конец периода формирования (дата) */
        formation_end?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<CreatedExpertise[], any>({
        path: `/painting_expertise`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description Получение информации о заявке на экспертизу по ее ID
     *
     * @tags painting_expertise
     * @name PaintingExpertiseRead
     * @request GET:/painting_expertise/{id}
     * @secure
     */
    paintingExpertiseRead: (id: string, params: RequestParams = {}) =>
      this.request<CreateExpertiseByIdResponse, any>({
        path: `/painting_expertise/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description Удаление экспертизы
     *
     * @tags painting_expertise
     * @name PaintingExpertiseDeleteDelete
     * @request DELETE:/painting_expertise/{id}/delete
     * @secure
     */
    paintingExpertiseDeleteDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/painting_expertise/${id}/delete`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Формирование экспертизы
     *
     * @tags painting_expertise
     * @name PaintingExpertiseFormUpdate
     * @request PUT:/painting_expertise/{id}/form
     * @secure
     */
    paintingExpertiseFormUpdate: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/painting_expertise/${id}/form`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * @description Изменение автора экспертизы
     *
     * @tags painting_expertise
     * @name PaintingExpertisePutUpdate
     * @request PUT:/painting_expertise/{id}/put/
     * @secure
     */
    paintingExpertisePutUpdate: (
      id: string,
      data: { author: string },
      params: RequestParams = {},
    ) =>
      this.request<{ author: string }, void>({
        path: `/painting_expertise/${id}/put/`,
        method: "PUT",
        body: data, // Передача данных в body
        secure: true,
        type: ContentType.Json, // Указание типа содержимого
        format: "json", // Указание формата ответа
        ...params,
      }),

    /**
     * @description Закрытие или отклонение Заявки на экспертизу модератором
     *
     * @tags painting_expertise
     * @name PaintingExpertiseResolveUpdate
     * @request PUT:/painting_expertise/{id}/resolve
     * @secure
     */
    paintingExpertiseResolveUpdate: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/painting_expertise/${id}/resolve`,
        method: "PUT",
        secure: true,
        ...params,
      }),
  };
  paintingInExpertise = {
    /**
     * @description Удаление картины из экспертизы
     *
     * @tags painting_in_expertise
     * @name PaintingInExpertiseDeleteDelete
     * @request DELETE:/painting_in_expertise/{expertise_pk}/{painting_pk}/delete
     * @secure
     */
    paintingInExpertiseDeleteDelete: (expertisePk: string, paintingPk: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/painting_in_expertise/${expertisePk}/${paintingPk}/delete`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Изменение данных о картине в экспертизе
     *
     * @tags painting_in_expertise
     * @name PaintingInExpertisePutUpdate
     * @request PUT:/painting_in_expertise/{expertise_pk}/{painting_pk}/put
     * @secure
     */
    paintingInExpertisePutUpdate: (expertisePk: string, paintingPk: string, data: ExpertiseComment, params: RequestParams = {}) =>
      this.request<ExpertiseComment, any>({
        path: `/painting_in_expertise/${expertisePk}/${paintingPk}/put`,
        method: "PUT",
        body: data,
        secure: true,
        ...params,
      }),
  };
  paintings = {
    /**
     * @description Получение всех картин
     *
     * @tags paintings
     * @name PaintingsList
     * @request GET:/paintings
     * @secure
     */
    paintingsList: (
      query?: {
        /** Фильтр по названию картины */
        title?: string;
        page?: number;
        page_size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<{
          paintings: {
            /** Уникальный идентификатор картины */
            pk: number;
            /** Название картины */
            title: string;
            /** Путь к изображению */
            img_path: string;
            /** Краткое описание картины */
            short_description: string;
            /** Полное описание картины */
            description: string;
          }[];
          /** Общее количество картин */
          count: number;
          expertise_id: string;
      }>({
        path: `/paintings`,
        method: "GET",
        query: query, // Передаем query-параметры сюда
        format: "json",
        ...params,
      }),

    /**
     * @description Класс CRUD операций над картиной
     *
     * @tags paintings
     * @name PaintingsList2
     * @request GET:/paintings/
     * @originalName paintingsList
     * @duplicate
     * @secure
     */
    paintingsList2: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/paintings/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description Класс CRUD операций над картиной
     *
     * @tags paintings
     * @name PaintingsCreate
     * @request POST:/paintings/
     * @secure
     */
    paintingsCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/paintings/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * @description Класс CRUD операций над картиной
     *
     * @tags paintings
     * @name PaintingsUpdate
     * @request PUT:/paintings/
     * @secure
     */
    paintingsUpdate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/paintings/`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * @description Класс CRUD операций над картиной
     *
     * @tags paintings
     * @name PaintingsDelete
     * @request DELETE:/paintings/
     * @secure
     */
    paintingsDelete: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/paintings/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Класс CRUD операций над картиной
     *
     * @tags paintings
     * @name PaintingsRead
     * @request GET:/paintings/{id}
     * @secure
     */
    paintingsRead: (pk: string, params: RequestParams = {}) =>
      this.request<Painting, any>({
        path: `/paintings/${pk}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description Класс CRUD операций над картиной
     *
     * @tags paintings
     * @name PaintingsCreate2
     * @request POST:/paintings/{id}
     * @originalName paintingsCreate
     * @duplicate
     * @secure
     */
    paintingsCreate2: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/paintings/${id}`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * @description Класс CRUD операций над картиной
     *
     * @tags paintings
     * @name PaintingsUpdate2
     * @request PUT:/paintings/{id}
     * @originalName paintingsUpdate
     * @duplicate
     * @secure
     */
    paintingsUpdate2: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/paintings/${id}`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * @description Класс CRUD операций над картиной
     *
     * @tags paintings
     * @name PaintingsDelete2
     * @request DELETE:/paintings/{id}
     * @originalName paintingsDelete
     * @duplicate
     * @secure
     */
    paintingsDelete2: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/paintings/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Добавление картины в заявку на экспертизу
     *
     * @tags paintings
     * @name PaintingsAddCreate
     * @request POST:/paintings/{id}/add/
     * @secure
     */
    paintingsAddCreate: (id: string, params: RequestParams = {}) =>
      this.request<{ message: string; expertise_id: string }, any>({
        path: `/paintings/${id}/add/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * @description Добавление или замена изображения для картины по его ID.
     *
     * @tags paintings
     * @name PaintingsAddImageCreate
     * @request POST:/paintings/{id}/add_image/
     * @secure
     */
    paintingsAddImageCreate: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/paintings/${id}/add_image/`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
  user = {
    /**
     * @description Создание пользователя
     *
     * @tags user
     * @name UserCreateCreate
     * @request POST:/user/create
     * @secure
     */
    userCreateCreate: (
      data: {
        /** Username */
        username?: string;
        /** Email */
        email?: string;
        /** Password */
        password?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/user/create`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.UrlEncoded,
        ...params,
      }),

    /**
     * @description Вход
     *
     * @tags user
     * @name UserLoginCreate
     * @request POST:/user/login
     * @secure
     */
    userLoginCreate: (
      data: {
        /** username */
        username: string;
        /** password */
        password: string;
        email?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<AuthRequest, string>({
        path: `/user/login`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.UrlEncoded,
        ...params,
      }),

    /**
     * @description Выход
     *
     * @tags user
     * @name UserLogoutCreate
     * @request POST:/user/logout
     * @secure
     */
    userLogoutCreate: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/user/logout`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * @description Обновление данных пользователя
     *
     * @tags user
     * @name UserUpdateUpdate
     * @request PUT:/user/update
     * @secure
     */
    userUpdateUpdate: (data: User, params: RequestParams = {}) =>
      this.request<User, void>({
        path: `/user/update`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
