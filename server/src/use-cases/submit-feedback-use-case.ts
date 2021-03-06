import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase {
    // private feedbacksRepository: FeedbacksRepository;

    // constructor(
    //     feedbacksRepository: FeedbacksRepository
    // ) {
    //     this.feedbacksRepository = feedbacksRepository;
    // }

    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter,
    ) { }


    async execute(request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot } = request;

        //não usando o principio da inversão de dependência ficaria assim

        // const PrismaFeedbackRepository = new PrismaFeedbackRepository();

        if (!type) {
            throw new Error('Type is required.');
        }

        if (!comment) {
            throw new Error('Type is required.');
        }

        //regra de negócio para verificar se o screenshot foi enviado corretamente
        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot format.');
        }

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot,
        });

        await this.mailAdapter.sendMail({
            subject: 'Novo feedback',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #222;">`,
                `<p>Tipo do feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                `</div>`
            ].join('\n')
        });
    }
}