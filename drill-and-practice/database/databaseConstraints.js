import { executeQuery } from "../database/database.js";

const changeConstraints = async () => { 
  // Drop constraints, then adding ON DELETE CASCADE
  await executeQuery(`ALTER TABLE question_answers 
    DROP CONSTRAINT question_answers_user_id_fkey,
    DROP CONSTRAINT question_answers_question_id_fkey,
    DROP CONSTRAINT question_answers_question_answer_option_id_fkey;`
  );

  await executeQuery(`ALTER TABLE question_answers
    ADD CONSTRAINT question_answers_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    ADD CONSTRAINT question_answers_question_id_fkey FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
    ADD CONSTRAINT question_answers_question_answer_option_id_fkey FOREIGN KEY (question_answer_option_id) REFERENCES question_answer_options(id) ON DELETE CASCADE;`
  );

  await executeQuery(`ALTER TABLE question_answer_options
    DROP CONSTRAINT question_answer_options_question_id_fkey;`
  );

  await executeQuery(`ALTER TABLE question_answer_options
    ADD CONSTRAINT question_answer_options_question_id_fkey FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE;`
  );

  await executeQuery(`ALTER TABLE questions
    DROP CONSTRAINT questions_user_id_fkey,
    DROP CONSTRAINT questions_topic_id_fkey;`
  );

  await executeQuery(`ALTER TABLE questions
    ADD CONSTRAINT questions_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    ADD CONSTRAINT questions_topic_id_fkey FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE;`
  );
};

const originalConstraints = async () => {
  // Drop constraints, then set constraints to originals

  await executeQuery(`ALTER TABLE question_answers 
    DROP CONSTRAINT question_answers_user_id_fkey,
    DROP CONSTRAINT question_answers_question_id_fkey,
    DROP CONSTRAINT question_answers_question_answer_option_id_fkey;`
  );

  await executeQuery(`ALTER TABLE question_answers
    ADD CONSTRAINT question_answers_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
    ADD CONSTRAINT question_answers_question_id_fkey FOREIGN KEY (question_id) REFERENCES questions(id),
    ADD CONSTRAINT question_answers_question_answer_option_id_fkey FOREIGN KEY (question_answer_option_id) REFERENCES question_answer_options(id);`
  );

  await executeQuery(`ALTER TABLE question_answer_options
    DROP CONSTRAINT question_answer_options_question_id_fkey;`
  );

  await executeQuery(`ALTER TABLE question_answer_options
    ADD CONSTRAINT question_answer_options_question_id_fkey FOREIGN KEY (question_id) REFERENCES questions(id);`
  );

  await executeQuery(`ALTER TABLE questions
    DROP CONSTRAINT questions_user_id_fkey,
    DROP CONSTRAINT questions_topic_id_fkey;`
  );

  await executeQuery(`ALTER TABLE questions
    ADD CONSTRAINT questions_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
    ADD CONSTRAINT questions_topic_id_fkey FOREIGN KEY (topic_id) REFERENCES topics(id);`
  );
};

export { changeConstraints, originalConstraints};